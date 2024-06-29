import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureServiceComponent } from './structure-service.component';

describe('StructureServiceComponent', () => {
  let component: StructureServiceComponent;
  let fixture: ComponentFixture<StructureServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
