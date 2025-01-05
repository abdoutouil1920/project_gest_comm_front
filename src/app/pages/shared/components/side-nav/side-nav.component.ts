import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-gray-800 text-white h-full">
      <div class="p-4 text-lg font-bold border-b border-gray-700">Dashboard</div>
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
            routerLink="/analytics"
            class="flex items-center p-2 hover:bg-gray-700 rounded-md"
          >
            <i class="fas fa-product-hunt"></i>
            <span class="ml-4">Products</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      nav {
        width: 250px;
        height: 100vh;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
    `,
  ],
})
export class SideNavComponent {}
