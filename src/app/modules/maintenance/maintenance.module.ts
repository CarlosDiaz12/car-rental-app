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
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditClientComponent } from './pages/client/components/create-edit-client/create-edit-client.component';
import { CreateEditEmployeeComponent } from './pages/employee/components/create-edit-employee/create-edit-employee.component';
import { CreateEditFuelTypeComponent } from './pages/fuel-type/components/create-edit-fuel-type/create-edit-fuel-type.component';
import { CreateEditVehicleTypeComponent } from './pages/vehicle-type/components/create-edit-vehicle-type/create-edit-vehicle-type.component';
import { CreateEditModelComponent } from './pages/model/components/create-edit-model/create-edit-model.component';
import { CreateEditVehicleComponent } from './pages/vehicle/components/create-edit-vehicle/create-edit-vehicle.component';

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
    CreateEditClientComponent,
    CreateEditEmployeeComponent,
    CreateEditFuelTypeComponent,
    CreateEditVehicleTypeComponent,
    CreateEditModelComponent,
    CreateEditVehicleComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MaintenanceModule {}
