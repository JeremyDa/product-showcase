import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      description: 'Test Description 1',
      category: 'Test Category',
      image: 'test-image-1.jpg',
      rating: { rate: 4.5, count: 100 }
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 149.99,
      description: 'Test Description 2',
      category: 'Test Category',
      image: 'test-image-2.jpg',
      rating: { rate: 4.0, count: 80 }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        ProductService,
        provideHttpClient()
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
    
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products with selection state', (done) => {
    component.productsWithSelected$.subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].id).toBe(mockProducts[0].id);
      done();
    });
  });

  it('should call setSelectedProduct when product is selected', () => {
    const spy = spyOn(productService, 'setSelectedProduct');
    component.selectProduct(mockProducts[0]);
    expect(spy).toHaveBeenCalledWith(mockProducts[0]);
  });
}); 