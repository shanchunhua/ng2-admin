import { Component } from '@angular/core';

import { CustomRenderComponent } from './custom-render.component';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http/src/http';
import 'style-loader!./smartTables.scss';
import 'style-loader!./buttons.scss';
import { ProductService } from './product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgUploaderOptions } from 'ngx-uploader';
import { CustomEditorComponent } from './custom-editor.component';
@Component({
  providers: [ProductService],
  selector: 'smart-tables',
  templateUrl: './productTables.html'
})

export class ProductTables {
  query: string = '';

  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      confirmSave: true,
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
      'catalogName': {
        title: '类型',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: this.catalogList
          }
        }
      },
      price: {
        title: '价格',
        type: 'string'
      },
      image: {
        title: '图像',
        type: 'html',
        valuePrepareFunction: (value, rowData) => {
          return '<img width="40px" src="' + value + '">';
        },
        editor: {
          type: 'custom',
          component: CustomEditorComponent
        }
      }
    }
  };

  id: number;
  source: LocalDataSource = new LocalDataSource();
  catalogList = [];
  constructor(private route: ActivatedRoute, protected http: Http, private service: ProductService) {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      this.id = id;
      this.load(id)
      this.service.loadCatalogs().then((data) => {
        var copy: any = {};
        Object.assign(copy, this.settings);
        this.catalogList = data;
        copy.columns.catalogName.editor.config.list = data.map((item) => {
          return { value: item.name, title: item.name }
        })
        this.settings = copy;
        console.log(this.catalogList);
      })
    });
  }

  load(id): void {
    console.log(id)
    this.id = id;
    this.http.get('http://localhost:8080//rest/admin/suppliers/' + id + '/products').toPromise().then((response) => {
      console.log(response.json());
      this.source.load(response.json().data.map(o => {
        o.catalogName = o.catalog.name;
        return o;
      }));
    });
  }
  onSaveConfirm(event) {
    console.log(event)
    var data = event.newData;
    var catalogName = data.catalogName;
    var catalog = this.catalogList.find((item: any) => {
      return item.name == catalogName;
    })
    data.catalog = catalog;
    data.supplier = {
      id: this.id
    };
    this.service.save(event.newData).then((response) => {
      this.load(this.id);
    });
    event.confirm.resolve();
  }
  onCreateConfirm(event) {
    this.onSaveConfirm(event);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
