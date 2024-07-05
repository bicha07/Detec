import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactmoisComponent } from './factmois.component';

describe('FactmoisComponent', () => {
  let component: FactmoisComponent;
  let fixture: ComponentFixture<FactmoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactmoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactmoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
