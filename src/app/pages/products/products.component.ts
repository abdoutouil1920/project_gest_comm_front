import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../shared/models/products.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="users-container p-6">
      <h2 class="text-2xl font-semibold mb-4">Products Management</h2>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" (click)="openUserDialog()">
        Add New Product
      </button>
      
      <table class="min-w-full mt-6 bg-white shadow-md rounded-md">
        <thead>
          <tr class="border-b">
            <th class="px-6 py-3 text-left font-medium text-gray-600">Name</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Price</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Stock</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products" class="border-b hover:bg-gray-50">
            <td class="px-6 py-3">{{ product.name }}</td>
            <td class="px-6 py-3">{{ product.price }}</td>
            <td class="px-6 py-3">{{ product.stock }}</td>
            <td class="px-6 py-3">{{ product.description }}</td>

            <td class="px-6 py-3">
              <button class="text-blue-500 hover:text-blue-600" (click)="editUser(products)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="text-red-500 hover:text-red-600 ml-4" (click)="deleteUser(products)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [``]
})
export class ProductsComponent {
  displayedColumns: string[] = ['name', 'price', 'stock','description', 'actions'];
  products = [
    { name: 'coca-cola', price:200, stock:1000, description:'botel of coce' },
    { name: 'boga', price:100, stock:500, description:'botel of boga' }
  ];

  openUserDialog() {
    // Implement user dialog
  }

  editUser(user: any) {
    // Implement edit functionality
  }

  deleteUser(user: any) {
    // Implement delete functionality
  }
}
