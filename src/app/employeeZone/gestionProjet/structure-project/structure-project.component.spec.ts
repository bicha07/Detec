import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureProjectComponent } from './structure-project.component';

describe('StructureProjectComponent', () => {
  let component: StructureProjectComponent;
  let fixture: ComponentFixture<StructureProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
