import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaladieComponent } from './edit-maladie.component';

describe('EditMaladieComponent', () => {
  let component: EditMaladieComponent;
  let fixture: ComponentFixture<EditMaladieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMaladieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
