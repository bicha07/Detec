import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkServiceComponent } from './link-service.component';

describe('LinkServiceComponent', () => {
  let component: LinkServiceComponent;
  let fixture: ComponentFixture<LinkServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
