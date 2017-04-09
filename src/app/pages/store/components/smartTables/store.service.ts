import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http/src/http';
import { AppSettings } from '../../../../app.config.ts';
@Injectable()
export class StoreService {
  // Observable string sources
  private settingDialogSource = new Subject < string > ();
  // Observable string streams
  settingDialogChanged$ = this.settingDialogSource.asObservable();
  // Service message commands

  constructor(protected http: Http) {}
  load() {
    console.log(AppSettings);
    return this.http.get(AppSettings.REST_ENDPOINT + 'stores/').toPromise().then((response) => {
      return response.json().data
    }).catch(this.handleError);
  }
  update(store: any) {
    return this.http.put('http://localhost:8080/rest/stores/', store).toPromise().then((response) => {
      return response.json().data
    }).catch(this.handleError);
  }
  showSettingDialog(id) {
    console.log(id);
    this.settingDialogSource.next(id);
  }
  loadSettings(id) {
    return this.http.get('http://localhost:8080/rest/stores/expMoneyRateSetting/' + id).toPromise().then((response) => {
      return response.json().data
    }).catch(this.handleError);
  }
  saveSettings(settings) {
    return this.http.post('http://localhost:8080/rest/stores/expMoneyRateSetting', settings).toPromise().then((response) => {
      return response.json().data
    }).catch(this.handleError);
  }
  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
