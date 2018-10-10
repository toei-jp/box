import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { KeyAction } from '../numpad/numpad.component';

const MAX_INPUT = 999999;

@Component({
    selector: 'app-purchase-payment',
    templateUrl: './purchase-payment.component.html',
    styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements OnInit {
    @Input() public purchase: PurchaseService;
    @Input() public paymentMethod: string;
    @Input() public onSubmit: Function;
    public numpad: boolean;
    public confirmForm: FormGroup;
    public hideNumpad: boolean;
    public handleKeyPress = this.inputNumber.bind(this);

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.confirmForm = this.formBuilder.group({
            notes: [false, [Validators.requiredTrue]]
        });
        this.hideNumpad = true;
        this.numpad = this.paymentMethod === '現金';
        this.purchase.data.cash = { receive: 0, return: 0 };
    }

    private inputNumber(action: KeyAction, num: number) {
        switch (action) {
            case KeyAction.clear:
                this.purchase.data.cash = { receive: 0, return: 0 };
                break;
            case KeyAction.ok:
                this.hideNumpad = true;
                break;
            case KeyAction.input:
                let received = this.purchase.data.cash === undefined ? 0 : this.purchase.data.cash.receive;
                let returned = 0;
                if (num < 10) {
                    received = received * 10 + num;
                } else {
                    received *= num;
                }
                if (received > MAX_INPUT) {
                    break;
                }
                if (received > this.purchase.getTotalPrice()) {
                    returned = received - this.purchase.getTotalPrice();
                }
                this.purchase.data.cash = {
                    receive: received,
                    return: returned
                };
                break;
        }
    }
}
