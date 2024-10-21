import { TestBed } from '@angular/core/testing';

import { JellyBeanService } from './jelly-bean.service';

describe('JellyBeanService', () => {
  let service: JellyBeanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JellyBeanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
