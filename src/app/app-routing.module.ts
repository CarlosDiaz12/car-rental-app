import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'maintenance',
    loadChildren: () =>
      import('./modules/maintenance/maintenance.module').then(
        (m) => m.MaintenanceModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'inspection',
    loadChildren: () =>
      import('./modules/inspection/inspection.module').then(
        (m) => m.InspectionModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'rent',
    loadChildren: () =>
      import('./modules/rent/rent.module').then((m) => m.RentModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
