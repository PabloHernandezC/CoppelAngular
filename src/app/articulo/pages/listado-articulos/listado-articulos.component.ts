import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CompartidoService } from '../../../compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloService } from '../../servicios/articulo.service';
import Swal from 'sweetalert2';
import { Articulo, TipoArticulo } from '../../interfaces/articulo';
import { ModalArticuloComponent } from '../../modal/modal-articulo/modal-articulo.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrl: './listado-articulos.component.css'
})
export class ListadoArticulosComponent implements OnInit, AfterViewInit {
  formSKU: FormGroup;
  existe: boolean = false;

  dataInicial: Articulo[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _articuloServicio : ArticuloService,
    private _compartidoService: CompartidoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ){
    this.formSKU = this.fb.group({
      SKU: ['',Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacionTabla;
  }
  ngOnInit(): void {
  }

  validar(opcion:number){
    let nuevoSku = parseInt(this.formSKU.value.SKU)
    this._articuloServicio.existeSku(nuevoSku).subscribe({
      next: data => {
        if(data.isExitoso){
          this.existe = data.resultado
        }
      },
      error: error => console.log(Error),
      complete: () => this.elegirOpcion(opcion)
    })
  }

  elegirOpcion(opcion:number){
    switch(opcion){
      case 0:
        this.buscar();
        break;
      case 1:
        this.nuevoArticulo();
        break;
      case 2:
        this.editarArticulo();
        break;
      case 3:
        this.eliminar();
        break;
      default:
        break;
    }
  }


  errorSku(rExista:boolean){
    let mensaje = ''

    if(rExista){
      mensaje = 'El Sku no Existe';
    }else {
      mensaje = 'El Sku ya Existe';
    }

    Swal.fire({
      title: mensaje,
      text: 'SKU ingresado ' + this.formSKU.value.SKU,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }



  nuevoArticulo(){
    if(!this.existe){
      const nuevo : TipoArticulo = {
        nuevoSKU:this.formSKU.value.SKU
      }
      this.dialog.open(ModalArticuloComponent,{disableClose: true, width: '600px', data: nuevo})
    }else{
      this.errorSku(false);
    }   
  }


  editarArticulo(){
    if(this.existe){
      const skuTemp = parseInt(this.formSKU.value.SKU);
      let nuevo : TipoArticulo = {
        nuevoSKU:this.formSKU.value.SKU
      }
      this._articuloServicio.obtenerSku(skuTemp).subscribe({
        next: data => {
          if(data.isExitoso){
            nuevo.nuevoArticulo = data.resultado[0];
          }
        },
        error: error => console.log(error),
        complete: () => {
          this.dialog.open(ModalArticuloComponent,{disableClose: true, width: '600px', data: nuevo})
        }
      })
    }else {
      this.errorSku(true);
    }
  }

  eliminar(){
    if(this.existe){
      this.eliminarArticulo(this.formSKU.value.SKU)
    }else {
      this.errorSku(true);
    }
  }

  buscar(){
    if(this.existe){
      const skuTemp = parseInt(this.formSKU.value.SKU);
      let nuevo : TipoArticulo = {
        nuevoSKU:''
      }
      this._articuloServicio.obtenerSku(skuTemp).subscribe({
        next: data => {
          if(data.isExitoso){
            nuevo.nuevoArticulo = data.resultado[0];
          }
        },
        error: error => console.log(error),
        complete: () => {
          this.dialog.open(ModalArticuloComponent,{disableClose: true, width: '600px', data: nuevo})
        }
      })
    }else {
      this.errorSku(true);
    }
  }

  eliminarArticulo(sku: number){
    Swal.fire({
      title: '¿Desea Eliminar el Articulo?',
      text: sku +'',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonColor:'#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._articuloServicio.eliminar(sku).subscribe({
          next: (data) => {
            if(data.isExitoso){
              this._compartidoService.mostrarAlerta('EL Articulo '+ sku + ' fue eliminada','Completo')
            }else {
              this._compartidoService.mostrarAlerta('No se pudo eliminar la Especialidad ' + sku ,'Error!')
            }
          }, 
          error: (e) => {}
        })
      }
    })
  }
}
