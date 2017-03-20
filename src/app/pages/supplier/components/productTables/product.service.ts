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
  certificate(id) {
    this.http.get('http://localhost:8080/rest/suppliers/certificate/' + id).toPromise().then((response) => {
      this.changeSource.next(id);
    });

  }
}
