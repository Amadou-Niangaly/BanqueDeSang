import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHopitalComponent } from './update-hopital.component';

describe('UpdateHopitalComponent', () => {
  let component: UpdateHopitalComponent;
  let fixture: ComponentFixture<UpdateHopitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHopitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
