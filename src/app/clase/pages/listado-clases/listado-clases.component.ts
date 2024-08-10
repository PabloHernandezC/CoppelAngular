import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Clase } from '../../interfaces/clase';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClaseService } from '../../servicios/clase.service';
import { MatDialog } from '@angular/material/dialog';
import { CompartidoService } from '../../../compartido/compartido.service';
import { ModalClasesComponent } from '../../modal/modal-clases/modal-clases.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-clases',
  templateUrl: './listado-clases.component.html',
  styleUrl: './listado-clases.component.css'
})
export class ListadoClasesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombreClase',
    'nombreDepartamento',
    'acciones'
  ];

  dataInicial: Clase[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _claseServicio: ClaseService,
    private _compartidoService: CompartidoService,
    private dialog: MatDialog
  ){}

  nuevaClase(){
    this.dialog.open(ModalClasesComponent,{disableClose: true, width: '400px'})
      .afterClosed()
      .subscribe((resultado) => {
        if(resultado == 'true') this.obtenerClases()
      })
  }

  editarClase(clase: Clase){
    this.dialog.open(ModalClasesComponent,{disableClose: true, width: '400px', data:clase})
      .afterClosed()
      .subscribe((resultado) => {
        if(resultado == 'true') this.obtenerClases()
      })
  }

  obtenerClases(){
    this._claseServicio.lista().subscribe({
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

  eliminarClase(clase: Clase){
    Swal.fire({
      title: '¿Desea Eliminar la Clase?',
      text: clase.nombreClase,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor:'#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._claseServicio.eliminar(clase.idClase).subscribe({
          next: (data) => {
            if(data.isExitoso){
              this._compartidoService.mostrarAlerta('La Clase '+ clase.nombreClase + ' fue eliminada','Completo')
              this.obtenerClases();
            }else {
              this._compartidoService.mostrarAlerta('No se pudo eliminar la Clase ' + clase.nombreClase,'Error!')
            }
          }, 
          error: (e) => {}
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
    this.obtenerClases();
  }

}
