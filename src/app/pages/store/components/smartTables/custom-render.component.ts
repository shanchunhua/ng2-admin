import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {Subscription}   from 'rxjs/Subscription';
import {StoreService}     from './store.service';
import {Setting} from '../setting/setting.component'
@Component({
   providers: [
    Setting
    ],
  template: `
  <div (click)="onSetting(value.id)" class=" btn btn-success">setting</div>
  <a href="/#/pages/suppliers/producttable/{{value.id}}" class=" btn btn-success">产品列表</a>
    `
})
export class StoreCustomRenderComponent implements ViewCell {

  renderValue: any;
  @Input() value: any;
  @Output() onCertified = new EventEmitter < number > ();

  constructor(private service: StoreService,private setting: Setting) {

  }
  ngOnInit() {
    this.renderValue = this.value;
  }

  onSetting(id) {
    this.setting.showChildModal()
  }
}
