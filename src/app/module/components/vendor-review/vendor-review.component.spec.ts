import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReviewComponent } from './vendor-review.component';

describe('VendorReviewComponent', () => {
  let component: VendorReviewComponent;
  let fixture: ComponentFixture<VendorReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
