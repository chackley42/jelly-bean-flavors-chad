import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorDialogComponent } from './flavor-dialog.component';

describe('FlavorDialogComponent', () => {
  let component: FlavorDialogComponent;
  let fixture: ComponentFixture<FlavorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlavorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlavorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
