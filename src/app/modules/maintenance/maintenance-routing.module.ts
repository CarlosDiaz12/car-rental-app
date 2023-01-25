import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './pages/branch/branch.component';
import { ClientComponent } from './pages/client/client.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { FuelTypeComponent } from './pages/fuel-type/fuel-type.component';
import { VehicleTypeComponent } from './pages/vehicle-type/vehicle-type.component';
import { ModelComponent } from './pages/model/model.component';

const routes: Routes = [
  { path: 'branch', component: BranchComponent },
  { path: 'client', component: ClientComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'fueltype', component: FuelTypeComponent },
  { path: 'vehicletype', component: VehicleTypeComponent },
  { path: 'model', component: ModelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
