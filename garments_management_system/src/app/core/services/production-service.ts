import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Production } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {

  private apiUrl = environment.apiUrl + 'productions';

  constructor(private http: HttpClient, private cdr:ChangeDetectorRef) {}

  // GET ALL PRODUCTIONS
  getAllProductions(): Observable<Production[]> {
    return this.http.get<Production[]>(this.apiUrl);
    this.cdr.detectChanges;
  }

  // GET PRODUCTION BY ID
  getProductionById(id: string): Observable<Production> {
    return this.http.get<Production>(`${this.apiUrl}/${id}`);
     this.cdr.detectChanges;
  }

  // CREATE PRODUCTION
  addProduction(production: Production): Observable<Production> {
    return this.http.post<Production>(this.apiUrl, production);
  }

  // UPDATE PRODUCTION
  updateProduction(
    id: string,
    production: Production
  ): Observable<Production> {

    return this.http.put<Production>(
      `${this.apiUrl}/${id}`,
      production
    );

  }

  // DELETE PRODUCTION
  deleteProduction(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}