import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from './store.service';
import { Setting } from '../setting/setting.component'
import { AppSettings } from '../../../../app.config.ts';
@Component({
  template: `
  <div (click)="onSetting(value.id)" class=" btn btn-success">设置体验金比例</div>
  <a href="{{apiEndPoint}}wechat/authorize/store/{{value.id}}" target="_blank" class=" btn btn-success">授权</a>
    `
})
export class StoreCustomRenderComponent implements ViewCell {
  renderValue: any;
  @Input() value: any;
  apiEndPoint: string;
  constructor(private service: StoreService) {
    this.apiEndPoint = AppSettings.API_ENDPOINT;
  }
  ngOnInit() {
    this.renderValue = this.value;
  }

  onSetting(id) {
    this.service.showSettingDialog(id);
  }
}
