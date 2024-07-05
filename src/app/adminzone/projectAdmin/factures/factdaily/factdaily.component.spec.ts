import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactdailyComponent } from './factdaily.component';

describe('FactdailyComponent', () => {
  let component: FactdailyComponent;
  let fixture: ComponentFixture<FactdailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactdailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactdailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
