import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product.interface';
import {
  generateManyProduct,
  generateOneProduct,
} from '../models/product.mock';

describe('Test for ProductService', () => {
  let productService: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('Test for list()', () => {
    it('Should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProduct(2);
      productService.list().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });

      const req = httpController.expectOne(`${environment.uri}/products`);
      req.flush(mockData);
      httpController.verify();
    });
  });

  describe('Test for create()', () => {
    it('Should return a new product', (doneFn) => {
      const mockData: Product = generateOneProduct();
      productService.create(mockData).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });
      const req = httpController.expectOne(`${environment.uri}/products`);
      req.flush(mockData);
      expect(req.request.body).toEqual(mockData);
      httpController.verify();
    });
  });

  describe('Test for edit()', () => {
    it('Should return a product edited', (doneFn) => {
      const mockData: Product = generateOneProduct();
      mockData.description = 'Description';
      productService.edit(mockData).subscribe((product: Product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });
      const req = httpController.expectOne(`${environment.uri}/products`);
      req.flush(mockData);
      httpController.verify();
    });
  });

  describe('Test for delete()', () => {
    it('Should return true or false', (doneFn) => {
      const mockData: Product = generateOneProduct();
      const id = mockData.id ?? '';
      productService.delete(id).subscribe((resp: Boolean) => {
        console.log('resp', resp);
        
        expect(resp).toBeTruthy();
        doneFn();
      });
      const req = httpController.expectOne(`${environment.uri}/products?id=${id}`);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
