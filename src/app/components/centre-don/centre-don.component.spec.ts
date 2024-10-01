import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreDonComponent } from './centre-don.component';

describe('CentreDonComponent', () => {
  let component: CentreDonComponent;
  let fixture: ComponentFixture<CentreDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreDonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
