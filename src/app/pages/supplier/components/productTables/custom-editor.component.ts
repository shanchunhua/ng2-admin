import { Component, ViewChild, ElementRef } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
  <div *ngIf="!cell.getRow().isInEditing && cell.getColumn().type !== 'html'">
  {{ cell.getValue() }}
  <div *ngIf="!cell.getRow().isInEditing && cell.getColumn().type === 'html'" [innerHTML]="cell.getValue()">
   <input *ngIf="cell.getRow().isInEditing" 
   [ngClass]="inputClass"
    class="form-control"
     [(ngModel)]="cell.newValue"
      [name]="cell.getColumn().id" 
       [id]="cell.getColumn().id" 
        [type]="cell.getColumn().type" 
         [placeholder]="cell.getColumn().title"
          [disabled]="!cell.getColumn().isEditable"
           (click)="onClick($event)"
            (keydown.enter)="onEdited($event)" 
             (keydown.esc)="onStopEditing()">
    `
})
export class CustomEditorComponent extends DefaultEditor {

  @ViewChild('name') name: ElementRef;
  @ViewChild('url') url: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.cell.newValue !== ''){
      this.name.nativeElement.value = this.getUrlName();
      this.url.nativeElement.value = this.getUrlHref();
    }
  }

  updateValue(): void {
    const href = this.url.nativeElement.value;
    const name = this.name.nativeElement.value;
    this.cell.newValue = `<a href='${href}'>${name}</a>`;
  }

  getUrlName(): string {
    return this.htmlValue.nativeElement.innerText;
  }

  getUrlHref(): string {
    return this.htmlValue.nativeElement.querySelector('a').getAttribute('href');
  }
}
