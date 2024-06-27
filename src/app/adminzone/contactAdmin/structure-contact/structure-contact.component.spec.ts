import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureContactComponent } from './structure-contact.component';

describe('StructureContactComponent', () => {
  let component: StructureContactComponent;
  let fixture: ComponentFixture<StructureContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
