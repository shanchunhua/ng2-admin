import { Routes, RouterModule } from '@angular/router';

import { Stores } from './stores.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { ProductTables } from './components/productTables/productTables.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [{
  path: '',
  component: Stores,
  children: [
    { path: 'storetable', component: SmartTables },
    { path: 'producttable/:id', component: ProductTables },

  ]
}];

export const routing = RouterModule.forChild(routes);
