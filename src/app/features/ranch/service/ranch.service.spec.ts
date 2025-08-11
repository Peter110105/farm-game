import { TestBed } from '@angular/core/testing';

import { RanchService } from './ranch.service';

describe('RanchService', () => {
  let service: RanchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RanchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
