import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './pages/rent/rent.component';
import { CreateEditRentComponent } from './components/create-edit-rent/create-edit-rent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RentComponent, CreateEditRentComponent],
  imports: [CommonModule, RentRoutingModule, ReactiveFormsModule, SharedModule],
})
export class RentModule {}
