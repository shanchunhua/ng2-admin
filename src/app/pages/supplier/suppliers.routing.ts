import { Routes, RouterModule } from '@angular/router';

import { Suppliers } from './suppliers.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { ProductTables } from './components/productTables/productTables.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [{
  path: '',
  component: Suppliers,
  children: [
    { path: 'suppliertable', component: SmartTables },
    { path: 'producttable/:id', component: ProductTables },

  ]
}];

export const routing = RouterModule.forChild(routes);
