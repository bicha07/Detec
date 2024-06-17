import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleScComponent } from './single-sc.component';

describe('SingleScComponent', () => {
  let component: SingleScComponent;
  let fixture: ComponentFixture<SingleScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleScComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
