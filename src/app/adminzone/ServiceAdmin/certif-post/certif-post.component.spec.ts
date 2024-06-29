import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifPostComponent } from './certif-post.component';

describe('CertifPostComponent', () => {
  let component: CertifPostComponent;
  let fixture: ComponentFixture<CertifPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertifPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertifPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
