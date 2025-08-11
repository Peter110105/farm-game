import { TestBed } from '@angular/core/testing';

import { RanchComponent } from './ranch.component';

describe('RanchComponent', () => {
  let component: RanchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.inject(RanchComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
