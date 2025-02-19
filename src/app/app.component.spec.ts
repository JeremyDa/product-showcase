import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ProductListComponent,
        ProductDetailComponent
      ],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'product-app'`, () => {
    expect(component.title).toEqual('product-app');
  });

  it('should render product components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-product-list')).toBeTruthy();
    expect(compiled.querySelector('app-product-detail')).toBeTruthy();
  });
});
