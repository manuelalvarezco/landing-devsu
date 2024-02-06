import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  @Input() message: string = 'Operación exitosa!';
  @Input() action: string = 'OK';
  @Output() handleAccept = new EventEmitter<boolean>(false);

  handleAction(event: boolean) {
    this.handleAccept.emit(event);
  }

}
