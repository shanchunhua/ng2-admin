import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'modals',
  styleUrls: ['./modals.scss'],
  templateUrl: './setting.html'
})
export class Setting {
  @ViewChild('childModal') childModal: ModalDirective;

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
