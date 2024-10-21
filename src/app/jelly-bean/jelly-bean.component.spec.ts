import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JellyBeanComponent } from './jelly-bean.component';

describe('JellyBeanComponent', () => {
  let component: JellyBeanComponent;
  let fixture: ComponentFixture<JellyBeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JellyBeanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JellyBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
