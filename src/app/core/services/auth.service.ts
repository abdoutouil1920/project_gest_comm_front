import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }

  login(email: string, password: string): Promise<void> {
    // Implement actual login logic here
    const mockUser: User = {
      id: 1,
      name: 'Admin User',
      email,
      role: 'admin'
    };
    this.currentUserSubject.next(mockUser);
    return Promise.resolve();
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}