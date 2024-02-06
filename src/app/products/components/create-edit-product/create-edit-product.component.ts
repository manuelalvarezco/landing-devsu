import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ProductService } from '../../services/product.service';
import { Utils } from 'src/utils/utils';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
} from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit {
  form: any;
  productSelected;
  today = new Date();
  loading = false;
  openModal = false;
  message = '';
  existId = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productSelected = this.route.snapshot.data['product'];
  }

  ngOnInit(): void {
    this.productSelected ? this.editForm() : this.buildForm();
    this.handleValidateId();
    this.handleChangeDate();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [
        '',
        [Validators.required, Validators.minLength(3), Validators.max(10)],
      ],
      name: [
        '',
        [Validators.required, Validators.minLength(5), Validators.max(100)],
      ],
      description: [
        '',
        [Validators.required, , Validators.minLength(10), Validators.max(200)],
      ],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  editForm() {
    this.form = this.formBuilder.group({
      id: [
        { value: this.productSelected.id, disabled: true },
        [Validators.required, Validators.minLength(3), Validators.max(10)],
      ],
      name: [
        this.productSelected.name,
        [Validators.required, Validators.minLength(5), Validators.max(100)],
      ],
      description: [
        this.productSelected.description,
        [Validators.required, , Validators.minLength(10), Validators.max(200)],
      ],
      logo: [this.productSelected.logo, [Validators.required]],
      date_release: [
        moment(this.productSelected.date_release).format('YYYY-MM-DD'),
        [Validators.required],
      ],
      date_revision: [
        {
          value: moment(this.productSelected.date_revision).format(
            'YYYY-MM-DD'
          ),
          disabled: true,
        },
        [Validators.required],
      ],
    });
  }

  handleValidateId() {
    this.idField.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        startWith(''),
        filter((val: string) => typeof val === 'string'),
        switchMap((text: string) =>
          text ? this.productService.validateId(text) : ''
        )
      )
      .subscribe((resp: boolean) => {
        this.existId = resp;
        this.existId ? this.idField.setErrors({ valid: false }) : null;
      });
  }

  handleChangeDate() {
    this.dateReleaseField.valueChanges.subscribe((text: any) => {
      if (text) {
        const newYear = Number(text.split('-')[0]) + 1;
        const newDate = text.replace(text.split('-')[0], newYear.toString());
        const date = Utils.functionGetDate(newDate);
        this.dateRevisionField.setValue(moment(date).format('YYYY-MM-DD'));
      }
    });
  }

  get idField() {
    return this.form.get('id');
  }
  get nameField() {
    return this.form.get('name');
  }
  get descriptionField() {
    return this.form.get('description');
  }
  get logoField() {
    return this.form.get('logo');
  }
  get dateReleaseField() {
    return this.form.get('date_release');
  }
  get dateRevisionField() {
    return this.form.get('date_revision');
  }

  resetForm() {
    this.form.reset();
  }
  saveEditForm() {
    this.productSelected ? this.edit() : this.save();
    this.loading = true;
  }

  save() {
    const payload = this.updateModel();
    this.productService.create(payload).subscribe(() => {
      this.message = 'Producto creado!';
      this.loading = false;
      this.openModal = true;
      this.form.reset();
      this.form.setErrors(null);
      setTimeout(() => {
        this.router.navigateByUrl('/products');
      }, 3000);
    });
  }

  edit() {
    const payload = this.updateModel();
    this.productService.edit(payload).subscribe(() => {
      this.message = 'Producto actualizado!';
      this.loading = false;
      this.openModal = true;
      setTimeout(() => {
        this.router.navigateByUrl('/products');
      }, 3000);
    });
  }

  updateModel() {
    return {
      id: this.idField.value,
      name: this.nameField.value,
      description: this.descriptionField.value,
      logo: this.logoField.value,
      date_release: this.dateReleaseField.value,
      date_revision: this.dateRevisionField.value,
    };
  }

  closeModal() {
    this.openModal = false;
    this.router.navigateByUrl('/products');
  }
}
