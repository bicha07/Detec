import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePostComponent } from './formulaire-post.component';

describe('FormulairePostComponent', () => {
  let component: FormulairePostComponent;
  let fixture: ComponentFixture<FormulairePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulairePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
