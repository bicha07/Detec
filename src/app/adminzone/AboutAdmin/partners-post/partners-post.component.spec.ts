import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersPostComponent } from './partners-post.component';

describe('PartnersPostComponent', () => {
  let component: PartnersPostComponent;
  let fixture: ComponentFixture<PartnersPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
