import { Component, ViewChild, ElementRef ,NgZone, Inject } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
   <ba-card title="Picture Uploader" baCardClass="with-scroll">
        <ba-picture-uploader [picture]="url" [defaultPicture]="defaultPicture" [uploaderOptions]="uploaderOptions"  (onUpload)="handleUpload($event)"></ba-picture-uploader>
      </ba-card>

    Name: <input [ngClass]="inputClass"
            #name
            class="form-control short-input"
            [name]="cell.getId()"
            type="file" 
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getTitle()"
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()"><br>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    `
})
export class CustomEditorComponent extends DefaultEditor {

  @ViewChild('name') name: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;
  response: any;
  url:string;
  constructor(@Inject(NgZone) private zone: NgZone) {

    super();

  }
public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
     autoUpload: true,
    url: 'http://localhost:8080/rest/fileupload/',
  };
  ngAfterViewInit(): void {
     console.log(this.cell.getValue());
    if (this.cell.newValue !== ''){
      console.log('hha');
      setTimeout(()=>{
       this.url = this.getImageUrl(); 
      })
       
    }
  }

  handleUpload(data: any) {
    console.log('here');
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        console.log(this.response);
        this.cell.newValue='abc';
          console.log(data);
          console.log(data.response);
          setTimeout(()=>{
             console.log(data.response);
          })
        if (data && data.response) {
          this.response = JSON.parse(data.response);
          this.cell.newValue='abc';
          console.log(this.cell);
        }
      });
    });
  }
  getImageUrl(): string {
    return this.htmlValue.nativeElement.querySelector('img').getAttribute('src');
  }
}