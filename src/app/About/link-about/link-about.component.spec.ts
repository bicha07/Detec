import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAboutComponent } from './link-about.component';

describe('LinkAboutComponent', () => {
  let component: LinkAboutComponent;
  let fixture: ComponentFixture<LinkAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
