import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './pages/branch/branch.component';
import { ClientComponent } from './pages/client/client.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { FuelTypeComponent } from './pages/fuel-type/fuel-type.component';

const routes: Routes = [
  { path: 'branch', component: BranchComponent },
  { path: 'client', component: ClientComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'fueltype', component: FuelTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
