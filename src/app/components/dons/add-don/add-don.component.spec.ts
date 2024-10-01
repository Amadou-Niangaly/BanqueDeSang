import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDonComponent } from './add-don.component';

describe('AddDonComponent', () => {
  let component: AddDonComponent;
  let fixture: ComponentFixture<AddDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
