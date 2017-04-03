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
      console.log('xxxxxxx');
      this.settings=[];
      this.service.loadSettings(id).then(data => this.settings = data).then(() => this.showChildModal())

    })
  }
  ngOnInit(): void {}
  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  saveSettings(): void {
    console.log(this.settings)
    this.service.saveSettings(this.settings).then(()=>this.childModal.hide()); 
  }
}
