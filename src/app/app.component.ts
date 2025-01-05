import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
  ],
  template: `
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white flex flex-col">
        <div class="p-4 text-lg font-bold border-b border-gray-700">Dashboard</div>
        <nav class="flex-1">
          <ul class="space-y-2 p-4">
            <li>
              <a
                routerLink="/dashboard"
                class="flex items-center p-2 hover:bg-gray-700 rounded-md"
              >
                <i class="fas fa-tachometer-alt"></i>
                <span class="ml-4">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                routerLink="/users"
                class="flex items-center p-2 hover:bg-gray-700 rounded-md"
              >
                <i class="fas fa-users"></i>
                <span class="ml-4">Users</span>
              </a>
            </li>
            <li>
              <a
                routerLink="/admins"
                class="flex items-center p-2 hover:bg-gray-700 rounded-md"
              >
                <i class="fas fa-user-shield"></i>
                <span class="ml-4">Admins</span>
              </a>
            </li>
            <li>
              <a
                routerLink="/products"
                class="flex items-center p-2 hover:bg-gray-700 rounded-md"
              >
                <i class="fas fa-shopping-cart"></i>
                <span class="ml-4">Products</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Top Bar -->
        <header class="bg-blue-600 text-white flex items-center px-4 py-2 shadow-md">
          <span class="text-lg font-bold">Admin Dashboard</span>
          <div class="ml-auto flex items-center space-x-4">
            <button class="relative" (click)="toggleNotifications()">
              <i class="fas fa-bell"></i>
              <span
                *ngIf="notificationCount > 0"
                class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
              >
                {{ notificationCount }}
              </span>
            </button>
          </div>
        </header>

        <!-- Notification Dropdown -->
        <div
          *ngIf="showNotifications"
          class="absolute right-4 top-16 bg-white border border-gray-200 rounded-md shadow-lg w-72"
        >
          <div class="p-4">
            <h4 class="font-bold text-lg">Notifications</h4>
            <ul>
              <li
                *ngFor="let notification of notifications"
                class="flex items-start space-x-2 p-2 border-b last:border-b-0"
              >
                <i [class]="notification.icon"></i>
                <div>
                  <p>{{ notification.message }}</p>
                  <small class="text-gray-500">{{ notification.timestamp | date:'short' }}</small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Page Content -->
        <main class="flex-1 p-4 bg-gray-100">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .notification-item {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent {
  notificationCount = 0;
  notifications: any[] = [];
  showNotifications = false;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      this.notificationCount = notifications.filter((n) => !n.read).length;
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
