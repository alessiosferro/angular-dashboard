import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMessageListComponent } from './dashboard-message-list.component';

describe('DashboardMessageListComponent', () => {
  let component: DashboardMessageListComponent;
  let fixture: ComponentFixture<DashboardMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMessageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
