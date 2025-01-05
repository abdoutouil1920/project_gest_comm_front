import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service"; // Import ProductService
import { Products } from "../shared/models/products.model"; // Import Products model
import { CommonModule } from "@angular/common"; // Import CommonModule
import { FormsModule } from "@angular/forms"; // Import FormsModule for ngModel
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ProductService],
  template: `
    <div class="products-container p-6">
      <h2 class="text-2xl font-semibold mb-4">Products Management</h2>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        (click)="openProductDialog()"
      >
        Add New Product
      </button>

      <table class="min-w-full mt-6 bg-white shadow-md rounded-md">
        <thead>
          <tr class="border-b">
            <th class="px-6 py-3 text-left font-medium text-gray-600">Name</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Price</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Stock</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">
              Description
            </th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Image</th>
            
            <th class="px-6 py-3 text-left font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let product of products"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-3">{{ product.nom }}</td>
            <td class="px-6 py-3">{{ product.prix }}</td>
            <td class="px-6 py-3">{{ product.stock }}</td>
            <td class="px-6 py-3">{{ product.description }}</td>
            <td class="px-6 py-3">
              <img
                *ngIf="product.image"
                [src]="'data:image/jpeg;base64,' + product.image"
                alt="Product Image"
                class="h-16 w-16 object-cover"
              />
            </td>
            
            <td class="px-6 py-3">
              <button
                class="text-blue-500 hover:text-blue-600"
                (click)="editProduct(product)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="text-red-500 hover:text-red-600 ml-4"
                (click)="deleteProduct(product)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Product Modal -->
    <div
      *ngIf="isEditModalOpen"
      class="modal-overlay"
      (click)="closeEditModal()"
    >
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3 class="text-xl mb-4">Edit Product</h3>
        <form (ngSubmit)="submitEditProduct()">
          <div>
            <label for="name" class="block">Name:</label>
            <input
              id="name"
              [(ngModel)]="editedProduct.nom"
              name="name"
              class="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mt-4">
            <label for="price" class="block">Price:</label>
            <input
              type="number"
              id="price"
              [(ngModel)]="editedProduct.prix"
              name="price"
              class="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mt-4">
            <label for="stock" class="block">Stock:</label>
            <input
              type="number"
              id="stock"
              [(ngModel)]="editedProduct.stock"
              name="stock"
              class="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mt-4">
            <label for="description" class="block">Description:</label>
            <textarea
              id="description"
              [(ngModel)]="editedProduct.description"
              name="description"
              class="p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div class="mt-4">
            <label for="image" class="block">Image:</label>
            <input
              type="file"
              id="image"
              (change)="onImageSelect($event)"
              accept="image/*"
              class="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mt-4">
            <label for="images" class="block">Additional Images:</label>
            <input
              type="file"
              id="images"
              (change)="onMultipleImagesSelect($event)"
              accept="image/*"
              multiple
              class="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
              (click)="closeEditModal()"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
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
    `,
  ],
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  editedProduct: Products = { nom: "", prix: 0, stock: 0, description: "" };
  isEditModalOpen: boolean = false;
  imageFile: File | null = null;
  imagesFiles: File[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  openProductDialog() {
    this.editedProduct = { nom: "", prix: 0, stock: 0, description: "" };
    this.imageFile = null;
    this.imagesFiles = [];
    this.isEditModalOpen = true;
  }

  editProduct(product: Products) {
    this.editedProduct = { ...product };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  onMultipleImagesSelect(event: any) {
    const files = event.target.files;
    this.imagesFiles = Array.from(files);
  }

  submitEditProduct() {
    const formData = new FormData();
    formData.append("nom", this.editedProduct.nom);
    formData.append("description", this.editedProduct.description);
    formData.append("prix", this.editedProduct.prix.toString());
    formData.append("stock", this.editedProduct.stock.toString());

    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }

    if (this.imagesFiles.length > 0) {
      this.imagesFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (this.editedProduct.id) {
      this.productService
        .updateProduct(this.editedProduct.id, formData)
        .subscribe((updatedProduct) => {
          const index = this.products.findIndex(
            (p) => p.id === updatedProduct.id
          );
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.closeEditModal();
        });
    } else {
      this.productService.createProduct(formData).subscribe((newProduct) => {
        this.products.push(newProduct);
        this.closeEditModal();
      });
    }
  }

  deleteProduct(product: Products) {
    this.productService.deleteProduct(product.id!).subscribe(() => {
      this.products = this.products.filter((p) => p.id !== product.id);
    });
  }
}
