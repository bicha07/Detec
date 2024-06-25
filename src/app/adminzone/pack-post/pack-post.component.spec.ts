import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackPostComponent } from './pack-post.component';

describe('PackPostComponent', () => {
  let component: PackPostComponent;
  let fixture: ComponentFixture<PackPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
