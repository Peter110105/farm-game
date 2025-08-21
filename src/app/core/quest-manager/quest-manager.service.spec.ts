import { TestBed } from '@angular/core/testing';

import { QuestManagerService } from './quest-manager.service';

describe('QuestManager', () => {
  let service: QuestManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
