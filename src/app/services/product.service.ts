import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../pages/shared/models/products.model'; // Assuming your model is in this path

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Directly setting the API URL
  private apiUrl = 'http://localhost:8081/api/produits'; // Adjust the URL to match your backend's route

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  // Get a product by ID
  getProductById(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }

  // Create a new product
  createProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(id: number, product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
