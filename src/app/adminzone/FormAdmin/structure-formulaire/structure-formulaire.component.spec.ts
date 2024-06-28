import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureFormulaireComponent } from './structure-formulaire.component';

describe('StructureFormulaireComponent', () => {
  let component: StructureFormulaireComponent;
  let fixture: ComponentFixture<StructureFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
