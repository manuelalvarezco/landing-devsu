import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, retry } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL = environment.uri;
  private authorId = environment.authorId;

  constructor(private http: HttpClient) {}

  create(payload: Product): Observable<Product> {
    return this.http.post<Product>(`${this.URL}`, payload, {
      headers: { authorId: this.authorId },
    });
  }

  list(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.URL}`, {
        headers: { authorId: this.authorId },
      })
      .pipe(
        map((products) => {
          this.setLocalStorageProducts(products);
          return products;
        })
      );
  }

  get(id: any) {
    let list = [];
    const products = localStorage.getItem('products');
    if (typeof products === 'string') {
      list = JSON.parse(products);
      const product = list?.find((product: Product) => product.id === id);
      if (!product) {
        throw new Error('Error');
      }
      return of(product);
    }
    return of([]);
  }

  edit(payload: Product): Observable<Product> {
    return this.http.put<Product>(`${this.URL}`, payload, {
      headers: { authorId: this.authorId },
    });
  }

  delete(id: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.URL}?id=${id}`, {
      headers: { authorId: this.authorId },
    });
  }

  validateId(id: string) {
    return this.http.get(`${this.URL}/verification?id=${id}`, {
      headers: { authorId: this.authorId },
    });
  }

  setLocalStorageProducts(products: any): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

}
