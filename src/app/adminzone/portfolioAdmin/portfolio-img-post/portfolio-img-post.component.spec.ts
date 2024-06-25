import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioImgPostComponent } from './portfolio-img-post.component';

describe('PortfolioImgPostComponent', () => {
  let component: PortfolioImgPostComponent;
  let fixture: ComponentFixture<PortfolioImgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioImgPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioImgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
