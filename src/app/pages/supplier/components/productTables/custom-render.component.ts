import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {Subscription}   from 'rxjs/Subscription';
import {ProductService}     from './product.service';
@Component({
  template: `
  <div (click)="onCertificate(value.id)" class=" btn btn-success">审核通过</div>
  <a href="/#/pages/supplier/producttable/{{value.id}}" class=" btn btn-success">产品列表</a>
    `
})
export class CustomRenderComponent implements ViewCell {

  renderValue: any;
  @Input() value: any;
  @Output() onCertified = new EventEmitter < number > ();

  constructor(private productService: ProductService) {

  }
  ngOnInit() {
    this.renderValue = this.value;
  }

  onCertificate(id) {
    this.productService.certificate(id);
  }
}
