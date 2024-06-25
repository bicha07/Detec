import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAboutComponent } from './structure-about.component';

describe('StructureAboutComponent', () => {
  let component: StructureAboutComponent;
  let fixture: ComponentFixture<StructureAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
