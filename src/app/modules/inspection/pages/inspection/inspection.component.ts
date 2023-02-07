import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CreateEditInspectionComponent } from '../../components/create-edit-inspection/create-edit-inspection.component';
import { InspectionService } from '../../services/inspection.service';
import { DataService } from '../../../../shared/services/data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss'],
})
export class InspectionComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });

  textFilter: string = '';

  displayedColumns: string[] = [
    'vehicle',
    'client',
    'employee',
    'inspectionDate',
    'fuelQuantity',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<any>;
  filteredValues: any[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: InspectionService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadList();
  }

  clearFilter() {
    this.range.reset();
    this.textFilter = '';
    this.dataSource = new MatTableDataSource<any>(this.filteredValues);
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }
  applyFilter() {
    const fromDate = this.range.get('start')?.value;
    const toDate = this.range.get('end')?.value;
    console.log(this.range.value);
    let values = this.filteredValues;

    if (fromDate && toDate) {
      values = values.filter(
        (x) =>
          Date.parse(x.inspectionDate) >= Date.parse(fromDate) &&
          Date.parse(x.inspectionDate) <= Date.parse(toDate)
      );
    } else if (fromDate) {
      values = values.filter(
        (x) => Date.parse(x.inspectionDate) >= Date.parse(fromDate)
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

  export(): any {
    const headerList = [
      'Empleado',
      'Vehiculo',
      'Cliente',
      'Fecha Inspeccion',
      'Cant. Combustible',
    ];

    const dataExport = this.dataSource.data.map((r) => {
      return {
        Empleado: r.employee.name,
        Vehiculo: `${r.vehicle.brand.description}-${r.vehicle.model.description}`,
        Cliente: r.client.name,
        'Fecha Inspeccion': r.inspectionDate,
        'Cant. Combustible': r.fuelQuantity,
      };
    });
    const fileName = 'inspecciones-csv_' + new Date().toLocaleDateString();
    this.dataService.downloadCsvFile(dataExport, fileName, headerList);
  }

  add(): void {
    // abrir dialog con formulario
    const dialogRef = this.dialog.open(CreateEditInspectionComponent, {
      maxWidth: '1100px',
      maxHeight: '800px',
      data: {
        vehicleId: null,
        clientId: null,
        employeeId: null,
        fuelQuantity: 0,
        hasSpareTire: false,
        hasScratches: false,
        hasManualJack: false,
        hasGlassBreakage: false,
        firstTireCondition: false,
        secondTireCondition: false,
        thirdTireCondition: false,
        fourthTireCondition: false,
        inspectionDate: Date.now(),
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
        const dialogRef = this.dialog.open(CreateEditInspectionComponent, {
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

  loadList() {
    this.service.list().subscribe((value) => {
      this.filteredValues = value.data;
      this.dataSource = new MatTableDataSource<any>(this.filteredValues);
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
