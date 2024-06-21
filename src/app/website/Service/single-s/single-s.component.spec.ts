import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSComponent } from './single-s.component';

describe('SingleSComponent', () => {
  let component: SingleSComponent;
  let fixture: ComponentFixture<SingleSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
