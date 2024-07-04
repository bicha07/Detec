import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldProjectComponent } from './old-project.component';

describe('OldProjectComponent', () => {
  let component: OldProjectComponent;
  let fixture: ComponentFixture<OldProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OldProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
