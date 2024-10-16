import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../../services/card.service';
import { RouterModule } from '@angular/router';
import { CardPreviewService } from '../../../services/CardPreviewService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardPreviewModal } from './../card-preview-modal/card-preview-modal.component'; 
import { BusinessCardCsvXml } from '../../../models/business-card-csvxml.model';
import { AddBusinessCard } from '../../../models/add-business-card.model';


@Component({
  selector: 'app-card-form-input-by-file',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPreviewModal],
  templateUrl: './card-form-input-by-file.component.html',
  styleUrls: ['./card-form-input-by-file.component.css']
})
export class CardFormInputByFileComponent {
  selectedFile: File | null = null
  parsedCards: BusinessCardCsvXml[] = []; // Store parsed cards
  cardForm: FormGroup;
  previewCard: BusinessCardCsvXml | null = null;
  isDragging = false;
  notificationMessage: string = ''; // Store the notification message
  hasFile = false;
  notificationType: 'success' | 'error' = 'success';
  isValidFileExtensionMessage: string = ''; 
  isLoading = false;
  addCard: AddBusinessCard | null = null;
  photo :File |null = null;
  photostr?:string ="";
  previewData : BusinessCardCsvXml | null=null;
  constructor(
    private fb: FormBuilder,
    private cardPreviewService: CardPreviewService,
    private cardService: CardService
  ) {
    this.cardForm = this.fb.group({
      name: [ Validators.required],
      gender: [ Validators.required],
      dateOfBirth: [ Validators.required],
      email: [[Validators.required, Validators.email]],
      phone: [ Validators.required],
      photo: [''], // Photo is optional
      address: [ Validators.required],
    });
  }

  onSubmit(): void {
    if (this.selectedFile) {
        const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
        console.log(this.selectedFile);
        console.log(fileExtension);

        if (fileExtension === 'csv' || fileExtension === 'xml') {
            this.isLoading = true; // Start loading state
            this.cardService.importBusinessCards(this.selectedFile, fileExtension).subscribe({
              next: (cards: BusinessCardCsvXml[]) => {
                  this.parsedCards = cards; 
                  this.isLoading = false; // End loading state
                  console.log('Cards imported successfully:', cards);
              },
              error: (err) => {
                  this.isLoading = false; // End loading state
                  console.error('Error importing business cards:', err);
              }
          });
          
        } else {
            console.error('Unsupported file type. Please upload a CSV or XML file.');
        }
    } else {
        console.error('No file selected. Please choose a file to upload.');
    }
}

openPreview(previewData :BusinessCardCsvXml) {

  previewData.photo=this.photostr;
      if (previewData) {
          this.cardPreviewService.openPreview(previewData);
      } else {
          console.error('Preview data is invalid');
      }
}
 
  submitCard(card :BusinessCardCsvXml): void {
    if (this.cardForm.valid) {
       console.log("hi");
    }
    else {
      this.notificationMessage = 'Please fill all required fields.';
      this.clearNotification();
      }
    this.addCard = {
      name: card.name,
      email: card.email,
      phone: card.phone,
      gender: card.gender,
      dateOfBirth: card.dateOfBirth,
      address: card.address,
      photo: this.photo 
    };

      this.cardService.addCard(this.addCard).subscribe({
        next: (response) => {
          this.notificationMessage = 'Business card submitted successfully!';
          this.clearNotification();
          this.cardForm.reset(); 
        },
        error: (err) => {
          console.error("Error adding business card", err);
          this.notificationMessage = 'Error submitting business card. Please try again.';
          this.clearNotification();
        }
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
  


onFileSelected(file: File): void {
  // Validate the file extension
  if (!this.isValidFileExtension(file)) {
    this.isValidFileExtensionMessage = 'Invalid file type. Please upload a .csv or .xml file.';
    this.clearNotification();
    return; // Exit the function if the file type is invalid
  }

  // Check if a file was previously selected
  if (this.selectedFile) {
    if (this.selectedFile.name !== file.name) {
      this.notificationMessage = 'File replaced successfully!';
      this.clearNotification();
    }
  }

  // Handle file selection and preview logic
  this.selectedFile = file;
  this.hasFile = true;
  console.log('File selected:', this.selectedFile);
}



// Handle file input change
handleFileInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.onFileSelected(input.files[0]);
  }
}

// Handle drag-and-drop event
onDrop(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();

  this.isDragging = false;
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    this.onFileSelected(event.dataTransfer.files[0]);
  }
}


// Drag-and-drop events to manage drag state
onDragOver(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  this.isDragging = true;
}

onDragEnter(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  this.isDragging = true;
}

onDragLeave(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  this.isDragging = false;
}

deleteFile(): void {
  this.selectedFile = null;
  this.isDragging = false;
  console.log('File deleted');
}
clearNotification() {
  setTimeout(() => {
    this.notificationMessage = ''; // Clear the notification after 3 seconds
  }, 3000);
  setTimeout(() => {
    this.isValidFileExtensionMessage = ''; // Clear the notification after 3 seconds
  }, 3000);
}
// Validate file extension
isValidFileExtension(file: File | null): boolean {
  if (!file) return false; // Return false if the file is null

  const validExtensions = ['csv', 'xml'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  return validExtensions.includes(fileExtension);
}

}
