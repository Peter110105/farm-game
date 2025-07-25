/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CropService } from './crop.service';

describe('Service: Crop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CropService]
    });
  });

  it('should ...', inject([CropService], (service: CropService) => {
    expect(service).toBeTruthy();
  }));
});
