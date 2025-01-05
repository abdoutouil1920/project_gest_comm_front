// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../pages/shared/models/user.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users'; // API URL

  private usersSubject = new BehaviorSubject<User[]>([]); // Holds the list of all users
  users$ = this.usersSubject.asObservable(); // Observable for all users

  private adminsSubject = new BehaviorSubject<User[]>([]); // Holds the list of admins
  admins$ = this.adminsSubject.asObservable(); // Observable for admins

  constructor(private http: HttpClient) {}

  // Fetch the list of users from the backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`).pipe(
      tap(response => {
        console.log('All Users Response:', response);
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }

  // Fetch and update the list of all users
  fetchAndUpdateUsers(): void {
    this.getUsers().subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  // Fetch the list of admins from the backend
  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admins`).pipe(
      tap(response => {
        console.log('Admins Response:', response);
      }),
      catchError(error => {
        console.error('Error fetching admins:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }

  // Fetch and update the list of admins
  fetchAndUpdateAdmins(): void {
    this.getAdmins().subscribe(admins => {
      this.adminsSubject.next(admins);
    });
  }

  // Add a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Delete a user
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }
}
