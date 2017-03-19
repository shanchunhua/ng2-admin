import { Component } from '@angular/core';

import { CustomRenderComponent } from './custom-render.component';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http/src/http';
import 'style-loader!./smartTables.scss';
import 'style-loader!./buttons.scss';
@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
})

export class SmartTables {
  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      name: {
        title: '名称',
        type: 'string'
      },
      contact: {
        title: '联系人',
        type: 'string'
      },
      cellphone: {
        title: '联系电话',
        type: 'string'
      },
      status: {
        title: '状态',
        type: 'html',
        valuePrepareFunction: function (value, rowData) {
          console.log(arguments);
          return value == 'CERTIFED' ? '<div  class="btn btn-success">已认证</div>' : `<div  class="btn btn-danger">未认证</div>`;
        }
      },
      age: {
        title: '操作',
        type: 'custom',
        renderComponent: CustomRenderComponent,
        valuePrepareFunction: (cell, row) => {
          return row;
          /*
          var str='';
          if (row.status == "UNCERTFIED") {
             str+=`<div (click)="onCertificate(${row.id})" class=" btn btn-success">审核通过</div>`
          }else{
              str+=`<a href="/#/pages/supplier/producttable/${row.id}" class=" btn btn-success">产品列表</a>`
          }
          return str;*/
        }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected http: Http) {
    this.load();
  }

  load(): void {
    this.http.get('http://localhost:8080/rest/suppliers').toPromise().then((response) => {
      console.log(response.json());
      this.source.load(response.json().data);
    });
  }
  onSelect(event) {
    console.log(event)
  }

  onCertified(id): void {
    alert(1);
    this.http.get('http://localhost:8080/rest/suppliers/certificate/' + id).toPromise().then((response) => {
      console.log(response.json());
      this.load()
    });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
