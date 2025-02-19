import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products$ = this.productService.getProducts();

  selectProduct(product: Product): void {
    this.productService.setSelectedProduct(product);
  }
} 