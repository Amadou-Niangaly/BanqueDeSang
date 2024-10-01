import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHopitalComponent } from './add-hopital.component';

describe('AddHopitalComponent', () => {
  let component: AddHopitalComponent;
  let fixture: ComponentFixture<AddHopitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHopitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
