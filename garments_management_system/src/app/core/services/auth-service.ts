import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

 private authUrl: string = environment.apiUrl + 'users';

   // Store Logged User
  private currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());

  // Observable
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) { }


  // Get User from LocalStorage
  private getStoredUser() {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }


  // Login User
  loginUser(user: User) {

    localStorage.setItem('user', JSON.stringify(user));

    // Update Observable
    this.currentUserSubject.next(user);

  }


  // Logout User
  logoutUser() {

    localStorage.removeItem('user');

    // Update Observable
    this.currentUserSubject.next(null);

  }


  // Get Current User
  getCurrentUser() {

    return this.currentUserSubject.value;

  }


  // Get Request
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.authUrl);
  }


  // Post Request
  save(user: User) {
    return this.http.post<User>(this.authUrl, user);
  }

  // delete request
  delete(id: string): Observable<void> {

    return this.http.delete<void>(this.authUrl + '/' + id)

  }


  getById(id: string): Observable<User> {

    return this.http.get<User>(this.authUrl + '/' + id);

  }


  getUserByEmail(email: string): Observable<User[]> {

    return this.http.get<User[]>(`${this.authUrl}?email=${email}`);

  }


}
