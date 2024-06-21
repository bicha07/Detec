import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkContactComponent } from './link-contact.component';

describe('LinkContactComponent', () => {
  let component: LinkContactComponent;
  let fixture: ComponentFixture<LinkContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
