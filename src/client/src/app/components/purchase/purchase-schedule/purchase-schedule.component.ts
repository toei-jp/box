import { Component, OnInit } from '@angular/core';
import { factory } from '@toei-jp/cinerino-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { CinerinoService } from '../../../services/cinerino/cinerino.service';
import { ErrorService } from '../../../services/error/error.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { IConfig, SaveType, StorageService } from '../../../services/storage/storage.service';

type IMovieTheater = factory.organization.movieTheater.IOrganization;
type IScreeningEvent = factory.chevre.event.screeningEvent.IEvent;
interface IFilmOrder {
    id: string;
    films: IScreeningEvent[];
}

interface IDate {
    value: string;
    label: string;
}

@Component({
    selector: 'app-purchase-schedule',
    templateUrl: './purchase-schedule.component.html',
    styleUrls: ['./purchase-schedule.component.scss']
})
export class PurchaseScheduleComponent implements OnInit {
    public theater: IMovieTheater;
    public isLoading: boolean;
    public dateList: IDate[];
    public filmOrder: IFilmOrder[];
    public schedules: IScreeningEvent[];
    public conditions: { theater: string; date: string };
    public environment = environment;
    private config: IConfig;

    constructor(
        private error: ErrorService,
        private purchase: PurchaseService,
        private cinerino: CinerinoService,
        private storage: StorageService
    ) {
        this.dateList = [];
        this.filmOrder = [];
        this.conditions = {
            theater: '',
            date: ''
        };
    }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public async ngOnInit(): Promise<void> {
        window.scrollTo(0, 0);
        this.isLoading = true;
        try {
            this.config = this.storage.load('config', SaveType.Local);
            if (this.config === null) {
                throw new Error('設定が保存していません。');
            }
            await this.cinerino.getServices();
            this.theater = (await this.cinerino.organization.findMovieTheaterByBranchCode({branchCode: this.config.theater})).data[0];
            this.dateList = this.getDateList(7);
            this.conditions = {
                theater: this.config.theater,
                date: this.dateList[0].value
            };
            await this.changeConditions();
        } catch (err) {
            this.error.redirect(err);
        }
        this.isLoading = false;
    }

    /**
     * @method getDateList
     * @param {number} loop
     * @returns {IDate[]}
     */
    public getDateList(loop: number): IDate[] {
        const results = [];
        for (let i = 0; i < loop; i++) {
            const date = moment().add(i, 'day');
            results.push({
                value: date.format('YYYYMMDD'),
                label: (i === 0) ? '本日' :
                       (i === 1) ? '明日' :
                       (i === 2) ? '明後日' :
                       date.format('MM/DD')
            });
        }

        return results;
    }

    /**
     * 条件変更
     * @method changeConditions
     * @returns {Promise<void>}
     */
    public async changeConditions(): Promise<void> {
        this.isLoading = true;
        this.filmOrder = [];
        try {
            await this.cinerino.getServices();
            this.schedules = (await this.cinerino.event.searchScreeningEvents({
                superEvent: {
                    locationBranchCodes: [this.config.theater]
                },
                startFrom: moment(this.conditions.date).toDate(),
                startThrough: moment(this.conditions.date).add(1, 'day').toDate()
            })).data;
            this.filmOrder = this.getEventFilmOrder();
            // console.log(this.filmOrder);
        } catch (err) {
            this.error.redirect(err);
        }
        this.isLoading = false;
    }

    /**
     * 作品別上映スケジュール取得
     * @function getScreeningEvents
     * @returns {IFilmOrder[]}
     */
    public getEventFilmOrder(): IFilmOrder[] {
        const results: IFilmOrder[] = [];
        this.schedules.forEach((screeningEvent) => {
            // 販売可能時間判定
            if (
                !this.purchase.isSales(screeningEvent) ||
                !this.purchase.isSalesTime(screeningEvent) ||
                screeningEvent.maximumAttendeeCapacity === undefined
            ) {
                return;
            }
            const film = results.find((event) => {
                return (event.id === screeningEvent.workPerformed.identifier);
            });
            if (film === undefined) {
                results.push({
                    id: screeningEvent.workPerformed.identifier,
                    films: [screeningEvent]
                });
            } else {
                film.films.push(screeningEvent);
            }
        });

        return results.sort((event1, event2) => {
            if (event1.films[0].name.ja < event2.films[0].name.ja) {
                return -1;
            }
            if (event1.films[0].name.ja > event2.films[0].name.ja) {
                return 1;
            }
            return 0;
        });
    }

}
