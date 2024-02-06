import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';
import { ProductResolver } from './resolvers/product.resolver';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'create', component: CreateEditProductComponent },
  {
    path: 'edit/:id',
    resolve: {
      product: ProductResolver,
    },
    component: CreateEditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
