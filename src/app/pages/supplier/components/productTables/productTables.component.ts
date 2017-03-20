import { Component } from '@angular/core';

import { CustomRenderComponent } from './custom-render.component';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http/src/http';
import 'style-loader!./smartTables.scss';
import 'style-loader!./buttons.scss';
import { ProductService } from './product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  providers: [ProductService],
  selector: 'smart-tables',
  templateUrl: './productTables.html',
})

export class ProductTables {
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
        title: '类型',
        type: 'string'
      },
      cellphone: {
        title: '价格',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private route: ActivatedRoute, protected http: Http, service: ProductService) {
    this.route.params.subscribe(params => {
      var id = +params['id']; 
      this.load(id)
    });
  }

  load(id): void {
    console.log(id)
    this.http.get('http://localhost:8080//rest/admin/suppliers/'+id+'/products').toPromise().then((response) => {
      console.log(response.json());
      this.source.load(response.json().data);
    });
  }
  onSelect(event) {
    console.log(event)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
