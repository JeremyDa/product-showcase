import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListComponent {
  private productService = inject(ProductService);
  
  productsWithSelected$ = combineLatest([
    this.productService.getProducts(),
    this.productService.selectedProduct$
  ]).pipe(
    map(([products, selectedProduct]) => 
      products.map(product => ({
        ...product,
        selected: selectedProduct?.id === product.id
      }))
    )
  );

  selectProduct(product: Product): void {
    this.productService.setSelectedProduct(product);
  }
} 