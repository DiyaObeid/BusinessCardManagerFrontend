import { Component,Input } from '@angular/core';
import { BusinessCardCsvXml } from '../../../models/business-card-csvxml.model';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'card-preview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-preview-modal.component.html',
  styleUrl: './card-preview-modal.component.css'
})
export class CardPreviewModal {
  @Input() cardData: BusinessCardCsvXml | null = null;
}
