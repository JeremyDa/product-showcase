import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../services/product.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: ProductService;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        ProductService,
        provideHttpClient(withFetch())
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService);
    const mockSelectedProduct = new BehaviorSubject<Product | null>(mockProduct);
    Object.defineProperty(productService, 'selectedProduct$', {
      value: mockSelectedProduct.asObservable()
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details when product is selected', (done) => {
    component.selectedProduct$.subscribe(product => {
      expect(product).toEqual(mockProduct);
      done();
    });
  });

  it('should call setSelectedProduct with null when closeDetail is called', () => {
    const spy = spyOn(productService, 'setSelectedProduct');
    component.closeDetail();
    expect(spy).toHaveBeenCalledWith(null);
  });
}); 