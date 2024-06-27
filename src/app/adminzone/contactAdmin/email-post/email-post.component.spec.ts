import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPostComponent } from './email-post.component';

describe('EmailPostComponent', () => {
  let component: EmailPostComponent;
  let fixture: ComponentFixture<EmailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
