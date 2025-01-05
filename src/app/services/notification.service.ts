import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();

  addNotification(message: string, icon: string = 'notifications') {
    const currentNotifications = this.notifications.value;
    const newNotification: Notification = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      read: false,
      icon
    };
    
    this.notifications.next([newNotification, ...currentNotifications]);
  }

  markAsRead(id: number) {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notifications.next(updatedNotifications);
  }
}