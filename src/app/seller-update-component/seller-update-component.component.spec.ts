import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateComponentComponent } from './seller-update-component.component';

describe('SellerUpdateComponentComponent', () => {
  let component: SellerUpdateComponentComponent;
  let fixture: ComponentFixture<SellerUpdateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
