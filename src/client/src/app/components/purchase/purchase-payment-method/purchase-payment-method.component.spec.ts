import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePaymentMethodComponent } from './purchase-payment-method.component';

describe('PurchasePaymentMethodComponent', () => {
  let component: PurchasePaymentMethodComponent;
  let fixture: ComponentFixture<PurchasePaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
