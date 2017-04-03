import { Component, EventEmitter, Input, Output ,ViewChild } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {Subscription}   from 'rxjs/Subscription';
import {StoreService}     from './store.service';
import {Setting} from '../setting/setting.component'
@Component({
  template: `
  <div (click)="onSetting(value.id)" class=" btn btn-success">设置体验金比例</div>
  <a href="/#/pages/suppliers/producttable/{{value.id}}" class=" btn btn-success">产品列表</a>
    `
})
export class StoreCustomRenderComponent implements ViewCell {
  renderValue: any;
  @Input() value: any;

  constructor(private service: StoreService) {

  }
  ngOnInit() {
    this.renderValue = this.value;
  }

  onSetting(id) {
    this.service.showSettingDialog(id);
  }
}
