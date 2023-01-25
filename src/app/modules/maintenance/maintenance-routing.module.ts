import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './pages/branch/branch.component';
import { ClientComponent } from './pages/client/client.component';

const routes: Routes = [
  { path: 'branch', component: BranchComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
