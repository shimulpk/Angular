import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Order } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl = environment.apiUrl + 'orders';

  constructor(private http: HttpClient) {}

  // GET ALL ORDERS
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // GET ORDER BY ID
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // CREATE ORDER
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // UPDATE ORDER
  updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }

  // DELETE ORDER
  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getOrdersByStatus(status: string) {
  return this.http.get<Order[]>(
    `${this.apiUrl}?status=${status}`
  );
}

}