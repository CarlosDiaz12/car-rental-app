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
import { InspectionComponent } from './pages/inspection/inspection.component';


@NgModule({
  declarations: [
    VehicleTypeComponent,
    BranchComponent,
    ModelComponent,
    FuelTypeComponent,
    VehicleComponent,
    ClientComponent,
    EmployeeComponent,
    InspectionComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenanceModule { }
