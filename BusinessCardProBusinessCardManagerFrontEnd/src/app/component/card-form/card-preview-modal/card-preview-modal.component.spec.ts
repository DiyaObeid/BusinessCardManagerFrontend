import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewModal } from './card-preview-modal.component';

describe('CardPreviewModalComponent', () => {
  let component: CardPreviewModal;
  let fixture: ComponentFixture<CardPreviewModal>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPreviewModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
