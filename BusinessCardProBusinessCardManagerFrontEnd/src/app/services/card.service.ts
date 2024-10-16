import { Injectable } from '@angular/core';
import { BusinessCard } from '../models/business-card.model'; // Adjust the path if necessary
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl, GetAllCards } from '../shared/api.url'; // Import the constants

@Injectable({
  providedIn: 'root',
})
export class CardService {
 

  
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
 
  getCards(): Observable<BusinessCard[]> {
    console.log(`${BaseUrl}${GetAllCards}`);
    return this.http.get<BusinessCard[]>(`${BaseUrl}${GetAllCards}`,{headers:this.headers}).pipe(
      catchError((error) => {
        console.error('Error fetching cards:', error); // Log the error
        return of([]); // Return an empty array as a fallback
      })
    );
  }

  
  



 

  
 
  
  
 
 


}
