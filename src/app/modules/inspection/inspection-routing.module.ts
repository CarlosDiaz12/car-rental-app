import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionComponent } from './pages/inspection/inspection.component';

const routes: Routes = [{ path: '', component: InspectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionRoutingModule {}
