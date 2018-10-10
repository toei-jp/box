import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig, SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-navigation-button',
    templateUrl: './navigation-button.component.html',
    styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {
    @Input() public prevLink: string;
    @Input() public confirm = true;
    @Input() public isRoot = false;
    public inquiryLink: string;

    constructor(
        private router: Router,
        private storage: StorageService
    ) { }

    public ngOnInit() {
        const config: IConfig = this.storage.load('config', SaveType.Local);
        this.inquiryLink = `/inquiry/login?theater=${config.theater}`;
    }

    public confirmRedirect(url: string, externalLink: boolean = false) {
        if (this.confirm && !confirm('仮予約をキャンセルします。よろしいですか？')) {
            return;
        }
        if (externalLink) {
            window.location.href = url;
        } else {
            this.router.navigate([url]);
        }
    }
}
