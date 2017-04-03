import { Component, OnInit } from '@angular/core';

import { StoreCustomRenderComponent } from './custom-render.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http/src/http';
import 'style-loader!./smartTables.scss';
import 'style-loader!./buttons.scss';
import { StoreService } from './store.service';
import { CustomEditorComponent } from './custom-editor.component';
@Component({
  providers: [StoreService],
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
})

export class SmartTables implements OnInit {

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
        editable: false,
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
      appid: {
        title: '公众号APPID',
        type: 'string'
      },
      banner1: {
        title: '图像',
        type: 'html',
        valuePrepareFunction: (value, rowData) => {
          return '<img width="40px" src="' + value + '">';
        },
        editor: {
          type: 'custom',
          component: CustomEditorComponent
        }
      },
      banner2: {
        title: '图像',
        type: 'html',
        valuePrepareFunction: (value, rowData) => {
          return '<img width="40px" src="' + value + '">';
        },
        editor: {
          type: 'custom',
          component: CustomEditorComponent
        }
      },
      banner3: {
        title: '图像',
        type: 'html',
        valuePrepareFunction: (value, rowData) => {
          return '<img width="40px" src="' + value + '">';
        },
        editor: {
          type: 'custom',
          component: CustomEditorComponent
        }
      },

      operation: {
        title: '操作',
        type: 'custom',
        editable: false,
        renderComponent: StoreCustomRenderComponent,
        valuePrepareFunction: (cell, row) => {
          return row;
        }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected http: Http, private service: StoreService) {
  }
  ngOnInit(): void {
    this.service.load().then((data: any) => {
      console.log('xxxx');
      console.log(data);
      this.source.load(data)
    })
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
