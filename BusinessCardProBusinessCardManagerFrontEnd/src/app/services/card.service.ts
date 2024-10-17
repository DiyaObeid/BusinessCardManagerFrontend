import { Injectable } from '@angular/core';
import { BusinessCard } from '../models/business-card.model'; // Adjust the path if necessary
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl, GetAllCards,DeleteCard,AddCard,ImportCard,FilterCards } from '../shared/api.url'; // Import the constants
import { AddBusinessCard } from '../models/add-business-card.model';
import { BusinessCardCsvXml } from '../models/business-card-csvxml.model';

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

  searchBusinessCards(term: string, searchString: string): Observable<BusinessCard[]> {
    const url = `${BaseUrl}${FilterCards}?term=${term}&searchString=${encodeURIComponent(searchString)}`; // Construct the full URL with query parameters
    console.log("GET request URL for search:", url); // Log URL to check if it's correct

    return this.http.get<BusinessCard[]>(url, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error fetching filtered cards:', error); // Log the error
        return of([]); // Return an empty array as a fallback
      })
    );
  }
  
  deleteCard(id: string) {
    try {
      const url = `${BaseUrl}${DeleteCard}/${id}`; // Construct the full URL
      console.log("DELETE request URL:", url); // Log URL to check if it's correct

      return this.http.delete(url, { headers: this.headers }).pipe(
        tap(() => console.log("DELETE request sent successfully")), // Log on success
        catchError((error: any) => {
          console.error("Error during DELETE request:", error); // Log error if any
          return throwError(() => new Error('Failed to delete business card.'));
        })
      );
    } catch (error) {
      console.error("Error while making delete request:", error); // Log any caught error
      throw error;
    }
}


addCard(card: AddBusinessCard): Observable<any> {
  const formData = new FormData();  
  formData.append('Name', card.name);
  formData.append('Email', card.email);
  formData.append('Phone', card.phone);
  formData.append('Gender', card.gender);
  formData.append('DateOfBirth', card.dateOfBirth.toString());
  formData.append('Address', card.address);
  if (card.photo) {
    console.log("from service");
    formData.append('PhotoFile', card.photo,card.name);
  }
  return this.http.post(`${BaseUrl}${AddCard}`, formData);
}

 
importBusinessCards(file: File, fileType: string): Observable<BusinessCardCsvXml[]> {
  const formData: FormData = new FormData();
  formData.append('file', file); 
  // Include fileType in the request options
  const httpOptions = {
      params: {
          fileType: fileType
      }
  };

  return this.http.post<BusinessCardCsvXml[]>(`${BaseUrl}${ImportCard}`, formData, httpOptions);
}
  
 
  
  
 
 


}
