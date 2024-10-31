import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMaladieComponent } from './form-maladie.component';

describe('FormMaladieComponent', () => {
  let component: FormMaladieComponent;
  let fixture: ComponentFixture<FormMaladieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMaladieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
