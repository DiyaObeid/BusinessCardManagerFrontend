import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewModalComponent } from './card-preview-modal.component';

describe('CardPreviewModalComponent', () => {
  let component: CardPreviewModalComponent;
  let fixture: ComponentFixture<CardPreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
