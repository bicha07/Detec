import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePortfolioComponent } from './structure-portfolio.component';

describe('StructurePortfolioComponent', () => {
  let component: StructurePortfolioComponent;
  let fixture: ComponentFixture<StructurePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructurePortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructurePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
