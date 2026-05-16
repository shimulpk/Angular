import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Bom } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class BomService {

  private apiUrl = environment.apiUrl + 'bom';

  constructor(private http: HttpClient) {}

  // GET ALL BOM
  getAllBom(): Observable<Bom[]> {
    return this.http.get<Bom[]>(this.apiUrl);
  }

  // GET BOM BY ID
  getBomById(id: string): Observable<Bom> {
    return this.http.get<Bom>(`${this.apiUrl}/${id}`);
  }

  // CREATE BOM
  addBom(bom: Bom): Observable<Bom> {
    return this.http.post<Bom>(this.apiUrl, bom);
  }

  // UPDATE BOM
  updateBom(id: string, bom: Bom): Observable<Bom> {
    return this.http.put<Bom>(`${this.apiUrl}/${id}`, bom);
  }

  // DELETE BOM
  deleteBom(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}