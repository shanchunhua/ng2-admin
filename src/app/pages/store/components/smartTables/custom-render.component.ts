import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {Subscription}   from 'rxjs/Subscription';
import {SupplierService}     from './supplier.service';
import {Setting} from '../setting/setting.component'
@Component({
  template: `
  <div (click)="onSetting(value.id)" class=" btn btn-success">setting</div>
  <a href="/#/pages/suppliers/producttable/{{value.id}}" class=" btn btn-success">产品列表</a>
    `
})
export class CustomRenderComponent implements ViewCell {

  renderValue: any;
  @Input() value: any;
  @Output() onCertified = new EventEmitter < number > ();

  constructor(private supplierService: SupplierService,private setting: Setting) {

  }
  ngOnInit() {
    this.renderValue = this.value;
  }

  onSetting(id) {
    this.setting.showChildModal()
  }
}
