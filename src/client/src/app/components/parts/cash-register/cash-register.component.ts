import { Component, Input, OnInit } from '@angular/core';
import { IConfig, SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-cash-register',
    templateUrl: './cash-register.component.html',
    styleUrls: ['./cash-register.component.scss']
})
export class CashRegisterComponent implements OnInit {
    @Input() public editable: boolean;
    @Input() public rejiList: { _id: string; name: string; selected: boolean }[];
    public hide: boolean;
    public config: IConfig;
    public covering: boolean;

    constructor(private storage: StorageService) { }

    public ngOnInit() {
        this.hide = true;
        this.covering = false;
        this.config = this.storage.load('config', SaveType.Local);
        if (this.config.cashRegister === undefined) {
            this.config.cashRegister = '';
        }
        if (Array.isArray(this.rejiList)) {
            this.rejiList.forEach((reji) => { reji.selected = false; });
            const selectedReji = this.rejiList.find((reji) => reji.name === this.config.cashRegister);
            if (selectedReji !== undefined) {
                selectedReji.selected = true;
            } else {
                this.config.cashRegister = this.rejiList[0].name;
                this.rejiList[0].selected = true;
            }
        }
        this.storage.save('config', this.config, SaveType.Local);
    }

    public showRejiList() {
        if (this.editable) {
            this.hide = false;
            this.covering = true;
        }
    }

    public hideRejiList() {
        this.hide = true;
        this.covering = false;
    }

    public selectReji(text: string) {
        this.rejiList.forEach((reji) => { reji.selected = false; });
        const selectedReji = this.rejiList.find((reji) => reji.name === text);
        if (selectedReji !== undefined) {
            selectedReji.selected = true;
        }
        this.config.cashRegister = text;
        this.storage.save('config', this.config, SaveType.Local);
        this.hide = true;
    }
}
