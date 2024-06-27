import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondateurPostComponent } from './fondateur-post.component';

describe('FondateurPostComponent', () => {
  let component: FondateurPostComponent;
  let fixture: ComponentFixture<FondateurPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondateurPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FondateurPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
