import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestBoardComponent } from './quest-board.component';

describe('QuestBoard', () => {
  let component: QuestBoardComponent;
  let fixture: ComponentFixture<QuestBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
