import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Departamento } from '../../interfaces/departamento';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DepartamentoService } from '../../servicios/departamento.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDepartamentoComponent } from '../../modal/modal-departamento/modal-departamento.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-departamento',
  templateUrl: './listado-departamento.component.html',
  styleUrl: './listado-departamento.component.css'
})
export class ListadoDepartamentoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'acciones'
  ];

  dataInicial: Departamento[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _departamentoServicio: DepartamentoService,
    private _compartidoService: CompartidoService,
    private dialog: MatDialog
  ){}

  nuevaDepartamento(){
    this.dialog.open(ModalDepartamentoComponent,{disableClose: true, width: '400px'})
      .afterClosed()
      .subscribe((resultado) => {
        if(resultado == 'true') this.obtenerDepartamentos()
      })
  }

  editarDepartamento(departamento: Departamento){
    this.dialog.open(ModalDepartamentoComponent,{disableClose: true, width: '400px', data:departamento})
      .afterClosed()
      .subscribe((resultado) => {
        if(resultado == 'true') this.obtenerDepartamentos()
      })
  }

  obtenerDepartamentos(){
    this._departamentoServicio.lista().subscribe({
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

  eliminarDepartamento(departamento: Departamento){
    Swal.fire({
      title: '¿Desea Eliminar el Departamento?',
      text: departamento.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor:'#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._departamentoServicio.eliminar(departamento.idDepartamento).subscribe({
          next: (data) => {
            if(data.isExitoso){
              this._compartidoService.mostrarAlerta('La Departamento '+ departamento.nombre + ' fue eliminada','Completo')
              this.obtenerDepartamentos();
            }else {
              this._compartidoService.mostrarAlerta('No se pudo eliminar la Departamento ' + departamento.nombre,'Error!')
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
    this.obtenerDepartamentos();
    this._departamentoServicio.obtenerId(6).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }
}
