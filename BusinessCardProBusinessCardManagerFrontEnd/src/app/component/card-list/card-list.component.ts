import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessCard } from '../../models/business-card.model';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs'; // Import Subscription
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule], // Add imports here
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  cards: BusinessCard[] = [];
  searchTerm: keyof BusinessCard = 'name'; // Default search term
  searchString: string = ''; // Search input value
  private subscription: Subscription = new Subscription(); // Manage subscriptions
  constructor(private cardService: CardService) {}


  ngOnInit(): void {
    this.loadCards(); // Fetch the cards when the component initializes
  }
  
  loadCards(): void {
    this.cardService.getCards().subscribe(
      (resp: any) => {
        console.log(resp); // Log the response
        this.cards = resp; // Assign the response to cards if it’s valid
      },
      (error) => {
        console.error('Error loading cards:', error); // Handle error
      }
    );
  }
  deleteCard(card: BusinessCard) {
    console.log(card.id);
    if (confirm(`Are you sure you want to delete ${card.name}'s business card?`)) {
      this.cardService.deleteCard(card.id).subscribe({
        next: () => {
          console.log(`${card.name}'s business card deleted successfully.`);
          this.loadCards(); // Refresh the card list after deletionhttps://github.com/DiyaObeid/BusinessCardManagerFrontend/pull/8/conflict?name=BusinessCardProBusinessCardManagerFrontEnd%252Fsrc%252Fapp%252Fcomponent%252Fcard-list%252Fcard-list.component.ts&ancestor_oid=3ce1db1a37a6df21d2f0745a8797aaf887f04479&base_oid=fa6e625aedc093caf28a88a3244a1b08a6f475f2&head_oid=83153630f639a9ae9dbadfcac6c069fe513b3cdd
        },
        error: (err) => {
          console.error('Error deleting business card:', err);
        }
      });
    }
  }
  exportCard(cardId: any): void {
    const id = parseInt(cardId, 10); // Convert to integer
    if (isNaN(id)) {
      console.error('Invalid card ID');
      return;
    }
    this.cardService.exportToCsv(id).subscribe(
      (blob) => {
        // Create a link element to download the file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BusinessCards.csv'; // Name the downloaded file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Cleanup
      },
      (error) => {
        console.error('Error exporting CSV:', error);
  }
}
