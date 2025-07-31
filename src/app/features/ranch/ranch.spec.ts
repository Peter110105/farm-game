import { TestBed } from '@angular/core/testing';

import { Ranch } from './ranch';

describe('Ranch', () => {
  let service: Ranch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ranch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
