import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockProducts = [mockProduct];

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should set and get selected product', fakeAsync(() => {
    service.setSelectedProduct(mockProduct);
    
    // Wait for debounce time
    tick(300);

    // Handle the HTTP request
    const req = httpMock.expectOne(`https://fakestoreapi.com/products/${mockProduct.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);

    service.selectedProduct$.subscribe(product => {
      expect(product).toEqual(mockProduct);
    });
  }));

  it('should store selected product in localStorage', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    service.setSelectedProduct(mockProduct);
    
    tick(300);
    
    const req = httpMock.expectOne(`https://fakestoreapi.com/products/${mockProduct.id}`);
    req.flush(mockProduct);

    expect(localStorage.setItem).toHaveBeenCalledWith('selectedProduct', JSON.stringify(mockProduct));
  }));
}); 