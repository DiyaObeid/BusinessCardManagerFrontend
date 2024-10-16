import { Injectable } from '@angular/core';
import { BusinessCardCsvXml } from '../models/business-card-csvxml.model';



@Injectable({
  providedIn: 'root',
})
export class CardPreviewService {
  constructor() {}

  openPreview(cardData: BusinessCardCsvXml | null): void {
    if (cardData?.name && cardData?.gender && cardData?.phone && cardData?.email && cardData?.address) {
      // Photo is optional, so we don't check for it here
      const modalElement = document.getElementById('previewModal');
      if (modalElement) {
        const bootstrapModal = new (window as any).bootstrap.Modal(modalElement!);
        bootstrapModal.show();
      }
    } else {
      console.error('Card data is missing for the preview.');
    }
  }
}  
