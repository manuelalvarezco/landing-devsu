import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
} from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { FormControl } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  headers = [
    'Logo',
    'Nombre del producto',
    'Descripción',
    'Fecha de liberación',
    'Fecha de revisión',
  ];
  loadingProducts = false;
  pageSize = 5;
  data: any[] = [];
  filterQuery = new FormControl('');
  showMenu = false;
  bodyText = 'This text can be updated in modal 1';
  showModal = false;
  productSelected: any = null;
  loading = false;
  openConfirmatioModal = false;
  message = '';
  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.hendleChangeFilterQuery();
  }

  hendleChangeFilterQuery() {
    this.filterQuery.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(''),
        filter((val) => typeof val === 'string')
      )
      .subscribe((text) => {
        const value: string | undefined = text?.trim();
        this.filterOptions(value);
      });
  }

  getProducts() {
    this.loadingProducts = true;
    this.productService.list().subscribe((products: Product[]) => {
      this.products = products;
      this.filterOptions();
      this.loadingProducts = false;
    });
  }

  filterOptions(filterQuery?: string) {
    this.data = filterQuery
      ? this.products.filter((product) => product.name.includes(filterQuery))
      : this.products.slice(0, this.pageSize);
  }

  getDate(data: string) {
    if (data) {
      let date = new Date(data);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date;
    }
    return '';
  }

  changePage(event: any) {
    this.pageSize = event.target.value;
    this.filterOptions();
  }

  openMenu(product: any) {
    this.showMenu = !this.showMenu;
    product.class = 'd-flex' ? this.showMenu : 'd-none';
  }

  openModal(id: string, product: any) {
    this.productSelected = product;
    this.openMenu(product);
    this.showModal = true;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteProduct() {
    this.loading = true;
    this.message = 'Producto eliminado!';
    this.productService.delete(this.productSelected.id).subscribe(
      (resp: any) => {
        this.setModalData();
      },
      () => {
        this.setModalData();
      }
    );
  }

  closeConfirmationModal() {
    this.openConfirmatioModal = false;
  }

  setModalData() {
    this.loading = false;
    this.openConfirmatioModal = true;
    setTimeout(() => {
      this.closeConfirmationModal();
    }, 3000);
    this.closeModal('custom-modal-1');
    this.getProducts();
  }
}
