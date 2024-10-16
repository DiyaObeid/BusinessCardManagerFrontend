import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { BusinessCard } from '../../models/business-card.model';
import { CardService } from '../../services/card.service'; // Import the mock service
import { ReactiveFormsModule } from '@angular/forms';
import { AddBusinessCard } from '../../models/add-business-card.model';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  cardForm: FormGroup;
  successMessage: string | null = null; // Flag for success message
  photo : File | null = null;
  photostr?:string ="";
  addCard: AddBusinessCard | null = null;
  
  constructor(private fb: FormBuilder, private cardService: CardService) {
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
      this.successMessage = ''; 
    }, 3000);
  }

  
  

}
