import { Routes, RouterModule }  from '@angular/router';

import { Suppliers } from './suppliers.component';
import { SmartTables } from './components/smartTables/smartTables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Suppliers,
    children: [
      { path: 'suppliertable', component: SmartTables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
