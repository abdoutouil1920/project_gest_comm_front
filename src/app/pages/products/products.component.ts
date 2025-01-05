import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import ProductService
import { Products } from '../shared/models/products.model';  // Import Products model
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [ProductService],
  template: `
    <div class="products-container p-6">
      <h2 class="text-2xl font-semibold mb-4">Products Management</h2>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" (click)="openProductDialog()">
        Add New Product
      </button>
      
      <table class="min-w-full mt-6 bg-white shadow-md rounded-md">
        <thead>
          <tr class="border-b">
            <th class="px-6 py-3 text-left font-medium text-gray-600">Name</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Price</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Stock</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Description</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products" class="border-b hover:bg-gray-50">
            <td class="px-6 py-3">{{ product.nom }}</td>
            <td class="px-6 py-3">{{ product.prix }}</td>
            <td class="px-6 py-3">{{ product.stock }}</td>
            <td class="px-6 py-3">{{ product.description }}</td>
            <td class="px-6 py-3">
              <button class="text-blue-500 hover:text-blue-600" (click)="editProduct(product)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="text-red-500 hover:text-red-600 ml-4" (click)="deleteProduct(product)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Product Modal -->
    <div *ngIf="isEditModalOpen" class="modal-overlay" (click)="closeEditModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3 class="text-xl mb-4">Edit Product</h3>
        <form (ngSubmit)="submitEditProduct()">
          <div>
            <label for="name" class="block">Name:</label>
            <input id="name" [(ngModel)]="editedProduct.nom" name="name" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="price" class="block">Price:</label>
            <input type="number" id="price" [(ngModel)]="editedProduct.prix" name="price" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="stock" class="block">Stock:</label>
            <input type="number" id="stock" [(ngModel)]="editedProduct.stock" name="stock" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="description" class="block">Description:</label>
            <textarea id="description" [(ngModel)]="editedProduct.description" name="description" class="p-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mt-6">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
            <button type="button" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md" (click)="closeEditModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];  // For holding products
  editedProduct: Products = { nom: '', prix: 0, stock: 0, description: '' }; // For holding the edited product data
  isEditModalOpen: boolean = false;  // Control modal visibility

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  openProductDialog() {
    // Reset the form for a new product
    this.editedProduct = { nom: '', prix: 0, stock: 0, description: '' };
    this.isEditModalOpen = true;  // Open the modal for creating a new product
  }

  editProduct(product: Products) {
    this.editedProduct = { ...product };  // Copy product data to editedProduct
    this.isEditModalOpen = true;  // Open the modal for editing the product
  }

  closeEditModal() {
    this.isEditModalOpen = false;  // Close the modal
  }

  submitEditProduct() {
    if (this.editedProduct.id) {
      // If editing an existing product
      this.productService.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(updatedProduct => {
        // Replace the old product data with the updated data in the list
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.closeEditModal();  // Close the modal after saving
      });
    } else {
      // If creating a new product
      this.productService.createProduct(this.editedProduct).subscribe(newProduct => {
        this.products.push(newProduct);  // Add new product to the list
        this.closeEditModal();  // Close the modal after saving
      });
    }
  }

  deleteProduct(product: Products) {
    this.productService.deleteProduct(product.id!).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
    });
  }
}
