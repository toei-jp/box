import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-next-button',
    templateUrl: './next-button.component.html',
    styleUrls: ['./next-button.component.scss']
})
export class NextButtonComponent implements OnInit {
    @Input() public disabled = false;
    constructor() { }

    public ngOnInit() {
    }

}
