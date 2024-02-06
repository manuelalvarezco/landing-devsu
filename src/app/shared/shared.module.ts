import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent,
    SpinnerLoadingComponent,
    SnackbarComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    ModalComponent,
    SpinnerLoadingComponent,
    SnackbarComponent,
  ],
})
export class SharedModule {}
