import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGalleryComponent } from './single-gallery.component';

describe('SingleGalleryComponent', () => {
  let component: SingleGalleryComponent;
  let fixture: ComponentFixture<SingleGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
