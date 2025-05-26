import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaSyncStatusComponent } from './tarea-sync-status.component';

describe('TareaSyncStatusComponent', () => {
  let component: TareaSyncStatusComponent;
  let fixture: ComponentFixture<TareaSyncStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaSyncStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaSyncStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
