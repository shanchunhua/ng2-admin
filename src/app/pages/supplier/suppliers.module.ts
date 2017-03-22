import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './suppliers.routing';
import { Suppliers } from './suppliers.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { ProductTables } from './components/productTables/productTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';
import { CustomEditorComponent } from './components/productTables/custom-editor.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    Suppliers,
    SmartTables,
    ProductTables
  ],
  providers: [
    SmartTablesService
  ]
})
export class SuppliersModule {}
