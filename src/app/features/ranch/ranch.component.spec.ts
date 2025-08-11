import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanchComponent } from './ranch.component';

describe('RanchComponent', () => {
  let component: RanchComponent;
  let fixture: ComponentFixture<RanchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RanchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RanchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
