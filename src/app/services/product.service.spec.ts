import { TestBed } from '@angular/core/testing';
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

  it('should set and get selected product', (done) => {
    service.setSelectedProduct(mockProduct);
    
    service.selectedProduct$.subscribe(product => {
      expect(product).toEqual(mockProduct);
      done();
    });
  });

  it('should store selected product in localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.setSelectedProduct(mockProduct);
    expect(localStorage.setItem).toHaveBeenCalledWith('selectedProduct', JSON.stringify(mockProduct));
  });
}); 