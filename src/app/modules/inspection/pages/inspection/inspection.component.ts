import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { WorkShift } from '../../../../core/enums/work-shift.enum';
import { CreateEditInspectionComponent } from '../../components/create-edit-inspection/create-edit-inspection.component';
import { InspectionService } from '../../services/inspection.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss'],
})
export class InspectionComponent implements OnInit {
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
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: InspectionService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadList();
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
