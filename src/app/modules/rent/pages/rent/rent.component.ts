import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RentService } from '../../services/rent.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CreateEditRentComponent } from '../../components/create-edit-rent/create-edit-rent.component';
import { DataService } from '../../../../shared/services/data.service';
import { SharedService } from '../../../../shared/shared.service';
@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss'],
})
export class RentComponent implements OnInit {
  displayedColumns: string[] = [
    'employee',
    'vehicle',
    'client',
    'rentDate',
    'returnDate',
    'ratePerDay',
    'daysQuantity',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: RentService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadList();
  }

  add(): void {
    const currentDate = new Date();
    // abrir dialog con formulario
    const dialogRef = this.dialog.open(CreateEditRentComponent, {
      maxWidth: '1100px',
      maxHeight: '800px',
      data: {
        vehicleId: null,
        clientId: null,
        employeeId: null,
        rentDate: new Date(),
        returnDate: new Date(),
        ratePerDay: null,
        daysQuantity: null,
        comment: '',
        returned: false,
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
        console.log(res.data);
        const dialogRef = this.dialog.open(CreateEditRentComponent, {
          maxWidth: '1100px',
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

  export(): void {
    const headerList = [
      'Empleado',
      'Vehiculo',
      'Cliente',
      'Fecha Renta',
      'Fecha Hasta',
      'Precio x dia',
      'Cant. dias',
    ];

    const dataExport = this.dataSource.data.map((r) => {
      return {
        Empleado: r.employee.name,
        Vehiculo: `${r.vehicle.brand.description}-${r.vehicle.model.description}`,
        Cliente: r.client.name,
        'Fecha Renta': r.rentDate,
        'Fecha Hasta': r.returnDate,
        'Precio x dia': r.ratePerDay,
        'Cant. dias': r.daysQuantity,
      };
    });
    const fileName = 'rentas-csv_' + new Date().toLocaleDateString();
    this.dataService.downloadCsvFile(dataExport, fileName, headerList);
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
