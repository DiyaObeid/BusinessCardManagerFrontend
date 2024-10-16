import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusinessCardCsvXml } from '../../models/business-card-csvxml.model';
import { CardService } from '../../services/card.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CardPreviewModal } from './card-preview-modal/card-preview-modal.component'; 
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/browser';
import { RouterModule } from '@angular/router';
import { CardPreviewService } from '../../services/CardPreviewService';
import { AddBusinessCard } from '../../models/add-business-card.model';
@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardPreviewModal,ZXingScannerModule,RouterModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  cardForm: FormGroup;
  addCard: AddBusinessCard | null = null;
  // PreCard: BusinessCardCsvXml | null = null;
  files: any[] = [];
  qrResultString: string = '';
  allowedFormats = [BarcodeFormat.QR_CODE];
  selectedDevice: MediaDeviceInfo | undefined;
  cameraOpen: boolean = false; 
  successMessage: string | null = null; // Flag for success message
  photo : File | null = null;
  photostr?:string ="";
  previewData : BusinessCardCsvXml | null=null;
  constructor(private fb: FormBuilder, private cardService: CardService, private cardPreviewService: CardPreviewService) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      photo: [''],
      address: ['', Validators.required],
    });
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photo = file;
      this.cardForm.patchValue({ photo: file });
      const photoUrl = URL.createObjectURL(file);
      this.photostr = photoUrl; 
    }
  }
  
   
  openPreview() {
    if (this.cardForm.valid) {
        console.log(this.cardForm?.value);
        console.log("trytoo");
        
        this.previewData = {
            name: this.cardForm.get("name")?.value,
            email: this.cardForm.get("email")?.value,
            phone: this.cardForm.get("phone")?.value,
            gender: this.cardForm.get("gender")?.value,
            dateOfBirth: this.cardForm.get("dateOfBirth")?.value,
            address: this.cardForm.get("address")?.value,
            photo: this.photostr,
        };

        // Check if previewData is valid before opening the preview
        if (this.previewData) {
            this.cardPreviewService.openPreview(this.previewData);
        } else {
            console.error('Preview data is invalid');
        }
    }

    console.log(this.cardForm.valid);
}

 
  submitCard(): void {
    if (this.cardForm.invalid) {
      this.cardForm.markAllAsTouched();
      console.log("Form is not valid");
      return;
    }
    this.addCard = {
      name: this.cardForm.get('name')?.value,
      email: this.cardForm.get('email')?.value,
      phone: this.cardForm.get('phone')?.value,
      gender: this.cardForm.get('gender')?.value,
      dateOfBirth: this.cardForm.get('dateOfBirth')?.value,
      address: this.cardForm.get('address')?.value,
      photo:this.photo
    };
    if (this.addCard != null) {
      console.log("Sending request to add business card");
      this.cardService.addCard(this.addCard).subscribe({
        next: (response) => {
          this.successMessage = "Business card added successfully!";
          this.cardForm.reset();
          this.addCard = null;
          this.clearNotification(); 
        },
        error: (err) => {
          console.error("Error adding business card", err);
        }
      });
    }
  }

  clearNotification() {
    setTimeout(() => {
      this.successMessage = ''; // Clear the notification after 3 seconds
    }, 3000);
  }

  
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.populateFormFromQRCode(resultString);
  }
  populateFormFromQRCode(data: string) {
    const parsedData = JSON.parse(data);
    this.cardForm.controls['name'].setValue(parsedData.name);
    this.cardForm.controls['gender'].setValue(parsedData.gender);
    this.cardForm.controls['dateOfBirth'].setValue(new Date(parsedData.dateOfBirth));
    this.cardForm.controls['email'].setValue(parsedData.email);
    this.cardForm.controls['phone'].setValue(parsedData.phone);
    this.cardForm.controls['address'].setValue(parsedData.address);
  }  

  clearResult(): void {
    this.qrResultString = '';
  }

  toggleCamera() {
    this.cameraOpen = !this.cameraOpen;
  }

}
