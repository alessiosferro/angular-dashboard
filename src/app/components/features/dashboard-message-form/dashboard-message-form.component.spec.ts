import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMessageFormComponent } from './dashboard-message-form.component';

describe('DashboardMessageFormComponent', () => {
  let component: DashboardMessageFormComponent;
  let fixture: ComponentFixture<DashboardMessageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMessageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
