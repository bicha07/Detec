import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPortfolioComponent } from './link-portfolio.component';

describe('LinkPortfolioComponent', () => {
  let component: LinkPortfolioComponent;
  let fixture: ComponentFixture<LinkPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
