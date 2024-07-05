import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactanneeComponent } from './factannee.component';

describe('FactanneeComponent', () => {
  let component: FactanneeComponent;
  let fixture: ComponentFixture<FactanneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactanneeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactanneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
