import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://fakestoreapi.com';
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  constructor(private http: HttpClient) {
    // Restore selected product state from localStorage
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      this.selectedProductSubject.next(JSON.parse(savedProduct));
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  setSelectedProduct(product: Product | null): void {
    this.selectedProductSubject.next(product);
    if (product) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
    } else {
      localStorage.removeItem('selectedProduct');
    }
  }
} 