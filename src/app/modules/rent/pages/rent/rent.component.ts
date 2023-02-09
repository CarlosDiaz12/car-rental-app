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
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss'],
})
export class RentComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  range2 = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  filteredValues: any[] = [];
  textFilter: string = '';

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

  clearFilter() {
    this.range.reset();
    this.range2.reset();
    this.textFilter = '';
    this.dataSource = new MatTableDataSource<any>(this.filteredValues);
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }
  complete(id: number) {
    this.service.completeRent(id).subscribe((res) => {
      this.loadList();
      this.table.renderRows();
    });
  }
  applyFilter() {
    let values = this.filteredValues;
    const fromDate = this.range.get('start')?.value;
    const toDate = this.range.get('end')?.value;

    if (fromDate && toDate) {
      values = values.filter(
        (x) =>
          Date.parse(x.rentDate) >= Date.parse(fromDate) &&
          Date.parse(x.rentDate) <= Date.parse(toDate)
      );
    } else if (fromDate) {
      values = values.filter(
        (x) => Date.parse(x.rentDate) >= Date.parse(fromDate)
      );
    }

    const fromDate2 = this.range2.get('start')?.value;
    const toDate2 = this.range2.get('end')?.value;

    if (fromDate2 && toDate2) {
      values = values.filter(
        (x) =>
          Date.parse(x.returnDate) >= Date.parse(fromDate2) &&
          Date.parse(x.returnDate) <= Date.parse(toDate2)
      );
    } else if (fromDate2) {
      values = values.filter(
        (x) => Date.parse(x.returDate) >= Date.parse(fromDate2)
      );
    }

    if (this.textFilter) {
      values = values.filter(
        (x) =>
          `${x.vehicle.brand.description} ${x.vehicle.model.description}`
            .toLowerCase()
            .includes(this.textFilter.toLowerCase()) ||
          x.client.name.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          x.employee.name.toLowerCase().includes(this.textFilter.toLowerCase)
      );
    }
    this.dataSource = new MatTableDataSource<any>(values);
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
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
      this.filteredValues = value.data;
      this.dataSource = new MatTableDataSource<any>(this.filteredValues);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe((res) => {
      this.loadList();
      this.table.renderRows();
    });
  }
}
