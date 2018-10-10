import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseWebMoneyPaymentComponent } from './purchase-web-money-payment.component';

describe('PurchaseWebMoneyPaymentComponent', () => {
  let component: PurchaseWebMoneyPaymentComponent;
  let fixture: ComponentFixture<PurchaseWebMoneyPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseWebMoneyPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseWebMoneyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
