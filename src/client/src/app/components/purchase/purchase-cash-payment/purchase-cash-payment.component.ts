import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error/error.service';
import { BoxPaymentMethod, PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
    selector: 'app-purchase-cash-payment',
    templateUrl: './purchase-cash-payment.component.html',
    styleUrls: ['./purchase-cash-payment.component.scss']
})
export class PurchaseCashPaymentComponent implements OnInit {
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
            await this.purchase.boxPaymentProcess(BoxPaymentMethod.Cash);
            await this.purchase.purchaseRegistrationProcess();
            this.router.navigate(['/purchase/complete']);
        } catch (err) {
            this.error.redirect(err);
        }
    }
}
