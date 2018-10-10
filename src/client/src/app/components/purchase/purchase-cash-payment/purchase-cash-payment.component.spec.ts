import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCashPaymentComponent } from './purchase-cash-payment.component';

describe('PurchaseCashPaymentComponent', () => {
  let component: PurchaseCashPaymentComponent;
  let fixture: ComponentFixture<PurchaseCashPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseCashPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
