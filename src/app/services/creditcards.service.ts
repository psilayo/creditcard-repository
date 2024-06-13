import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../models/credit-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {

  private apiUrl = "http://localhost:3000/creditcards";

  constructor(private httpClient: HttpClient) { }

  //CRUD Functionalty
  
  //Create New Credit Card
  createCreditCard (creditCard: CreditCard): Observable<CreditCard>{
   return this.httpClient.post<CreditCard>(this.apiUrl,creditCard);
    }
  
    //Get all Credit Cards
   getCreditCards (): Observable<CreditCard[]>{
    return this.httpClient.get<CreditCard[]>(this.apiUrl);
   }

   //Get Specific Credit Card
   getCreditCardById(id:number): Observable<CreditCard>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CreditCard>(url);
   }

  //Update Functionality
  updateCreditCard(creditCard: CreditCard): Observable<CreditCard>{
    const url = `${this.apiUrl}/${creditCard.id}`;
    return this.httpClient.put<CreditCard>(url, creditCard);
  }

   //Delete Functionality
   deleteCreditCard(id:number): Observable<void>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
   }
}
