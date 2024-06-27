import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelPostComponent } from './tel-post.component';

describe('TelPostComponent', () => {
  let component: TelPostComponent;
  let fixture: ComponentFixture<TelPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
