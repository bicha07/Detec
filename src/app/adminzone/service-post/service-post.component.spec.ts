import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePostComponent } from './service-post.component';

describe('ServicePostComponent', () => {
  let component: ServicePostComponent;
  let fixture: ComponentFixture<ServicePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
