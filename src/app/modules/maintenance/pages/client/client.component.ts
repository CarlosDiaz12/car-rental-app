import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TaxPayerType } from 'src/app/core/enums/tax-payer.enum';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CreateEditClientComponent } from './components/create-edit-client/create-edit-client.component';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'identificationCard',
    'creditCardNumber',
    'creditLimit',
    'taxPayerType',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClientService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadList();
  }

  add(): void {
    // abrir dialog con formulario
    const dialogRef = this.dialog.open(CreateEditClientComponent, {
      maxWidth: '1100px',
      maxHeight: '800px',
      data: {
        name: '',
        identificationCard: '',
        creditCardNumber: '',
        creditLimit: 0,
        taxPayerType: TaxPayerType.PHYSICAL.valueOf(),
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
        const dialogRef = this.dialog.open(CreateEditClientComponent, {
          maxWidth: '500px',
          maxHeight: '400px',
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
