import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkHomeComponent } from './link-home.component';

describe('LinkHomeComponent', () => {
  let component: LinkHomeComponent;
  let fixture: ComponentFixture<LinkHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
