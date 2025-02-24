import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private productService = inject(ProductService);
  
  productsWithSelected$ = combineLatest([
    this.productService.getProducts().pipe(
      distinctUntilChanged((prev, curr) => 
        prev.length === curr.length && 
        prev.every((p, i) => p.id === curr[i].id)
      )
    ),
    this.productService.selectedProduct$.pipe(
      distinctUntilChanged((prev, curr) => prev?.id === curr?.id)
    )
  ]).pipe(
    map(([products, selectedProduct]) => 
      products.map(product => ({
        ...product,
        selected: selectedProduct?.id === product.id
      }))
    ),
    shareReplay(1)
  );

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  selectProduct(product: Product): void {
    this.productService.setSelectedProduct(product);
  }
} 