import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Buyer } from '../../shared/model';



@Injectable({
  providedIn: 'root',
})
export class BuyerService {

  private apiUrl = environment.apiUrl + 'buyers';

  constructor(private http: HttpClient) {}

  // Get All Buyers
  getAllBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.apiUrl);
  }

 

  // Get Buyer By Id
  getBuyerById(id: number): Observable<Buyer> {
    return this.http.get<Buyer>(`${this.apiUrl}/${id}`);
  }

  // Create Buyer
  addBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(this.apiUrl, buyer);
  }

  // Update Buyer
  updateBuyer(id: string, buyer: Buyer): Observable<Buyer> {
    return this.http.put<Buyer>(`${this.apiUrl}/${id}`, buyer);
  }

  // Delete Buyer
  deleteBuyer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}
