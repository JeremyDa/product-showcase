import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
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
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  setSelectedProduct(product: Product | null): void {
    if (product) {
      this.getProductDetail(product.id).subscribe(detailProduct => {
        this.selectedProductSubject.next(detailProduct);
        localStorage.setItem('selectedProduct', JSON.stringify(detailProduct));
      });

    } else {
      this.selectedProductSubject.next(null);
      localStorage.removeItem('selectedProduct');
    }
  }
} 