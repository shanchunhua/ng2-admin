import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { StoreService } from '../smartTables/store.service';

@Component({
  selector: 'modals',
  styleUrls: ['./modals.scss'],
  templateUrl: './setting.html'
})
export class Setting implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  private settings: any;
  constructor(private service: StoreService) {
    service.settingDialogChanged$.subscribe((id) => {
      this.service.loadCatalogs(id).then(data => this.settings = data).then(() => this.showChildModal())

    })
  }
  ngOnInit(): void {}
  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
