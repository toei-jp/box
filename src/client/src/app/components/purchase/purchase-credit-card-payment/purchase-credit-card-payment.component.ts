import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error/error.service';
import { BoxPaymentMethod, PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
    selector: 'app-purchase-credit-card-payment',
    templateUrl: './purchase-credit-card-payment.component.html',
    styleUrls: ['./purchase-credit-card-payment.component.scss']
})
export class PurchaseCreditCardPaymentComponent implements OnInit {
    public isLoading: boolean;
    public submitHandle = this.onSubmit.bind(this);

    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private error: ErrorService
    ) { }

    public ngOnInit() { }

    private async onSubmit(invalid: boolean) {
        if (invalid) {
            return;
        }

        if (this.purchase.isExpired()) {
            this.router.navigate(['expired']);

            return;
        }
        this.isLoading = true;
        if (this.purchase.isExpired()) {
            this.router.navigate(['expired']);

            return;
        }
        try {
            if (this.purchase.data.transaction === undefined) {
                throw new Error('status is different');
            }

            await this.purchase.customerContactRegistrationProcess();
            await this.purchase.boxPaymentProcess(BoxPaymentMethod.CreditCard);
            await this.purchase.purchaseRegistrationProcess();
            this.router.navigate(['/purchase/complete']);
        } catch (err) {
            this.error.redirect(err);
        }
    }
}
