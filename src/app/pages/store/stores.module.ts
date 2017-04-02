import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './stores.routing';
import { Stores } from './stores.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { ProductTables } from './components/productTables/productTables.component';
import { StoreCustomRenderComponent } from './components/smartTables/custom-render.component';
import { CustomEditorComponent } from './components/smartTables/custom-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
    entryComponents: [ CustomEditorComponent],
  declarations: [
    Stores,
    SmartTables,
    ProductTables,
    CustomEditorComponent
  ],
  providers: [
  ]
})
export class StoresModule {}
