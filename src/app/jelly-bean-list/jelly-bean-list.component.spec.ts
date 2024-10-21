import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JellyBeanListComponent } from './jelly-bean-list.component';

describe('JellyBeanListComponent', () => {
  let component: JellyBeanListComponent;
  let fixture: ComponentFixture<JellyBeanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JellyBeanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JellyBeanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
