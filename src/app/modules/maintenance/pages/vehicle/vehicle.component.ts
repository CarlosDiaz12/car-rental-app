import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TaxPayerType } from 'src/app/core/enums/tax-payer.enum';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { WorkShift } from '../../../../core/enums/work-shift.enum';
import { CreateEditVehicleComponent } from './components/create-edit-vehicle/create-edit-vehicle.component';
import { VehicleService } from './services/vehicle.service';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  displayedColumns: string[] = [
    'description',
    'chassisNumber',
    'engineNumber',
    'plateNumber',
    'vehicleType',
    'brand',
    'model',
    'fuelType',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: VehicleService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadList();
  }

  add(): void {
    // abrir dialog con formulario
    const dialogRef = this.dialog.open(CreateEditVehicleComponent, {
      maxWidth: '1400px',
      maxHeight: '800px',
      data: {
        description: '',
        chassisNumber: null,
        engineNumber: null,
        plateNumber: '',
        vehicleTypeId: null,
        brandId: null,
        modelId: null,
        fuelTypeId: null,
        status: 'true',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.loadList();
        this.table.renderRows();
      }
    });
  }

  edit(id: number): void {
    // abrir dialog con formulario
    this.service.getById(id).subscribe((res) => {
      if (res.success) {
        const dialogRef = this.dialog.open(CreateEditVehicleComponent, {
          maxWidth: '1400px',
          maxHeight: '800px',
          data: res.data,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.loadList();
            this.table.renderRows();
          }
        });
      }
    });
  }

  confirmDialog(id: number): void {
    const message = `Estas seguro que deseas eliminar este registro?`;
    const dialogData = new ConfirmDialogModel('Confirmación', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.delete(id);
      }
    });
  }

  loadList() {
    this.service.list().subscribe((value) => {
      this.dataSource = new MatTableDataSource<any>(value.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe((res) => {
      this.loadList();
      this.table.renderRows();
    });
  }
}
