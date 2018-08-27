import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ContactComponent }    from './contact.component';

const routes = [
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
// export const routing = RouterModule.forRoot(APP_ROUTES);
export class ContactRoutingModule {}
