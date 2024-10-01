import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonFormComponent } from './don-form.component';

describe('DonFormComponent', () => {
  let component: DonFormComponent;
  let fixture: ComponentFixture<DonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
