import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCreditCardPaymentComponent } from './purchase-credit-card-payment.component';

describe('PurchaseCreditCardPaymentComponent', () => {
  let component: PurchaseCreditCardPaymentComponent;
  let fixture: ComponentFixture<PurchaseCreditCardPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseCreditCardPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCreditCardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
