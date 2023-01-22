import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { VehicleTypeComponent } from './pages/vehicle-type/vehicle-type.component';
import { BranchComponent } from './pages/branch/branch.component';
import { ModelComponent } from './pages/model/model.component';
import { FuelTypeComponent } from './pages/fuel-type/fuel-type.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { ClientComponent } from './pages/client/client.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { CreateEditBranchComponent } from './pages/branch/components/create-edit-branch/create-edit-branch.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    VehicleTypeComponent,
    BranchComponent,
    ModelComponent,
    FuelTypeComponent,
    VehicleComponent,
    ClientComponent,
    EmployeeComponent,
    CreateEditBranchComponent,
  ],
  imports: [CommonModule, MaintenanceRoutingModule, SharedModule],
})
export class MaintenanceModule {}
