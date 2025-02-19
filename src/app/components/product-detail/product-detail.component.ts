import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  selectedProduct$ = this.productService.selectedProduct$;

  closeDetail(): void {
    this.productService.setSelectedProduct(null);
  }
} 