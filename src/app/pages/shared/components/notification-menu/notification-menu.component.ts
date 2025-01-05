import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 max-w-sm w-full bg-white border rounded-lg shadow-md">
      <div *ngFor="let notification of notifications" class="flex items-start space-x-4 p-3 border-b border-gray-200 hover:bg-gray-100">
        <i class="fas fa-bell text-xl text-gray-500"></i>
        <div class="notification-content">
          <div class="text-sm font-medium text-gray-800">{{ notification.message }}</div>
          <small class="text-xs text-gray-500">{{ notification.timestamp | date:'short' }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class NotificationMenuComponent {
  @Input() notifications: Notification[] = [];
}
