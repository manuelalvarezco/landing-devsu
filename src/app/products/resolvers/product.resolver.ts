import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from '../services/product.service';


@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
  constructor(private router: Router, private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productService.get(route.paramMap.get('id')).pipe(catchError(() => {
      this.router.navigate(['/']);
      return EMPTY;
    }));
  }
}
