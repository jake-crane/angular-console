import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommunicationsComponent } from '../../components/communications/communications.component';
import { ConfigurationListComponent } from '../../components/configuration-list/configuration-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/configuration', pathMatch: 'full' },
  { path: 'configuration', component: ConfigurationListComponent },
  { path: 'communications', component: CommunicationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
