import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { CreateEditInspectionComponent } from './components/create-edit-inspection/create-edit-inspection.component';
import { InspectionComponent } from './pages/inspection/inspection.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateEditInspectionComponent, InspectionComponent],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class InspectionModule {}
