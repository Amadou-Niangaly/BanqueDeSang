import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchSectionComponent } from './serch-section.component';

describe('SerchSectionComponent', () => {
  let component: SerchSectionComponent;
  let fixture: ComponentFixture<SerchSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerchSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerchSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
