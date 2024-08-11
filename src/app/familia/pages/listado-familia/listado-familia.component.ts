import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Familia } from '../../interfaces/familia';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FamiliaService } from '../../servicios/familia.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFamiliaComponent } from '../../modal/modal-familia/modal-familia.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-familia',
  templateUrl: './listado-familia.component.html',
  styleUrl: './listado-familia.component.css'
})
export class ListadoFamiliaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombreFamilia',
    'nombreClase',
    'acciones'
  ];

  dataInicial: Familia[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _familiaService: FamiliaService,
    private _compartidoService: CompartidoService,
    private dialog: MatDialog
  ){}

  nuevaFamilia(){
    this.dialog.open(ModalFamiliaComponent,{disableClose: true, width: '400px'})
      .afterClosed()
      .subscribe((resultado) => {
        if(resultado == 'true') this.obtenerFamilias()
      })
  }

  editarFamilia(familia: Familia){
    this.dialog.open(ModalFamiliaComponent,{disableClose: true, width: '400px', data:familia})
      .afterClosed()
      .subscribe((resultado) => {
        if(resultado == 'true') this.obtenerFamilias()
      })
  }

  obtenerFamilias(){
    this._familiaService.lista().subscribe({
      next: (data) => {
        if(data.isExitoso){
          this.dataSource = new MatTableDataSource(data.resultado);
          this.dataSource.paginator = this.paginacionTabla;
        }else{
          this._compartidoService.mostrarAlerta('No se encontraron datos', 'Advertencia')
        }
      },
      error: (e) => {}
    })
  }

  eliminarFamilia(familia: Familia){
    Swal.fire({
      title: '¿Desea Eliminar la Familia?',
      text: familia.nombreFamilia,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor:'#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._familiaService.eliminar(familia.idFamilia).subscribe({
          next: (data) => {
            if(data.isExitoso){
              this._compartidoService.mostrarAlerta('La Familia '+ familia.nombreFamilia + ' fue eliminada','Completo')
              this.obtenerFamilias();
            }else {
              this._compartidoService.mostrarAlerta('No se pudo eliminar la Familia ' + familia.nombreFamilia,'Error!')
            }
          }, 
          error: (e) => {
            Swal.fire({
              title: 'No se pudo eliminar la Familia!',
              text: e.error.mensaje,
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
            })
          }
        })
      }
    })
  }

  aplicarFlitroListado(event: Event){
    const filtroValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacionTabla;
  }
  ngOnInit(): void {
    this.obtenerFamilias();
  }
}
