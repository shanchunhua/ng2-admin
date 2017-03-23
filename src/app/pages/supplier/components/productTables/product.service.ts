import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http/src/http';
@Injectable()
export class ProductService {
  // Observable string sources
  private changeSource = new Subject < string > ();
  // Observable string streams
  dataChanged$ = this.changeSource.asObservable();
  // Service message commands

  constructor(protected http: Http) {}
  save(item) {
    return this.http.post('http://localhost:8080/rest/products/', item).toPromise().then((response) => {
      this.changeSource.next(item);
    });
  }
  loadCatalogs() {
    return this.http.get('http://localhost:8080/rest/catalogs/').toPromise().then((response: any) => {
      console.log(response.json());
      return response.json().data;
    })
  }
}
