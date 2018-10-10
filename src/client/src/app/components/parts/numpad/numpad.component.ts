import { Component, Input, OnInit } from '@angular/core';

export enum KeyAction {
    input = 'input',
    clear = 'clear',
    ok = 'ok'
}

@Component({
    selector: 'app-numpad',
    templateUrl: './numpad.component.html',
    styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent implements OnInit {
    @Input() public keyPress: Function;
    @Input() public hide: boolean;
    public keyAction = KeyAction;

    constructor() { }

    public ngOnInit() {
    }

}
