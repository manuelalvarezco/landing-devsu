import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';
import { ProductService } from './services/product.service';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductResolver } from './resolvers/product.resolver';
import { AuthorIdInterceptor } from '../core/author-id.interceptor';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    CreateEditProductComponent,
    SkeletonLoaderComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    ProductService,
    ProductResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorIdInterceptor,
      multi: true,
    },
  ],
})
export class ProductsModule {}
