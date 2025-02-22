import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  private selectProductSubject = new Subject<Product | null>();
  selectedProduct$ = this.selectedProductSubject.asObservable();

  constructor(private http: HttpClient) {
    // Restore selected product state from localStorage
    const savedProductId = localStorage.getItem('selectedProductId');
    if (savedProductId) {
      this.getProductDetail(parseInt(savedProductId)).subscribe(product => {
        this.selectedProductSubject.next(product);
      });
    }

    // Handle product selection with debounce
    this.selectProductSubject.pipe(
      debounceTime(300),
      switchMap(product => {
        if (!product) return new Observable<Product | null>(sub => sub.next(null));
        return this.getProductDetail(product.id);
      })
    ).subscribe(product => {
      this.selectedProductSubject.next(product);
      if (product) {
        localStorage.setItem('selectedProductId', product.id.toString());
      } else {
        localStorage.removeItem('selectedProductId');
      }
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  setSelectedProduct(product: Product | null): void {
    this.selectProductSubject.next(product);
  }
} 