import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacttotalComponent } from './facttotal.component';

describe('FacttotalComponent', () => {
  let component: FacttotalComponent;
  let fixture: ComponentFixture<FacttotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacttotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacttotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
