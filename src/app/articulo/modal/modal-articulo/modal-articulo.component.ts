import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clase } from '../../../clase/interfaces/clase';
import { Departamento } from '../../../departamento/interfaces/departamento';
import { Familia } from '../../../familia/interfaces/familia';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Articulo, TipoArticulo } from '../../interfaces/articulo';
import { CompartidoService } from '../../../compartido/compartido.service';
import { ArticuloService } from '../../servicios/articulo.service';
import { ClaseService } from '../../../clase/servicios/clase.service';
import { DepartamentoService } from '../../../departamento/servicios/departamento.service';
import { FamiliaService } from '../../../familia/servicios/familia.service';
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrl: './modal-articulo.component.css'
})
export class ModalArticuloComponent implements OnInit {
  
  formArticulo: FormGroup;
  titulo: string = 'Agregar';
  nombreBoton: string = 'Guardar';
  listaClases: Clase[] = [];
  listaDepartamento: Departamento[] = [];
  listaFamilia: Familia[] = [];
  esDeshabilitado = false;
  idDepa : number = 0;
  idCas : number = 0;
  descontinuadoCheck = new FormControl({value: this.esDeshabilitado, disabled: true});
  esBuscar : boolean = false;
  estilo = 'fiil'

  constructor(
    private modal: MatDialogRef<ModalArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public datosArticulo: TipoArticulo,
    private fb: FormBuilder,
    private _articuloServicio: ArticuloService,
    private _compartidoServico: CompartidoService,
    private _claseService: ClaseService,
    private _departamentoService: DepartamentoService,
    private _familiaService: FamiliaService,
    private el: ElementRef, private renderer: Renderer2
  ){
    this.formArticulo = this.fb.group({
      sku: ['',  Validators.required],
      article: ['',Validators.required],
      marca: ['',Validators.required],
      modelo: ['',Validators.required],
      idDepartamento: ['',Validators.required],
      idClase: ['',Validators.required],
      idFamilia: ['',Validators.required],
      stock: ['',Validators.required],
      cantidad: ['',Validators.required],
      descontinuado: [''],
      fechaAlta: [''],
      fechaBaja: ['']
    });
    
    if(this.datosArticulo.nuevoArticulo != null){
      this.titulo = 'Editar'
      this.nombreBoton = 'Actualizar'
    }

    this._departamentoService.lista().subscribe({
      next: (data) => {
        if(data.isExitoso)
          this.listaDepartamento = data.resultado;
      },
      error: error => {
        this._compartidoServico.mostrarAlerta(error.mensaje, "Error!")
      }
    });
  }

  ngOnInit(): void {
    if(this.datosArticulo.nuevoArticulo != null){
      this.formArticulo.patchValue({
        sku: this.datosArticulo.nuevoArticulo.sku,
        article: this.datosArticulo.nuevoArticulo.article,
        marca: this.datosArticulo.nuevoArticulo.marca,
        modelo: this.datosArticulo.nuevoArticulo.modelo,
        idDepartamento: this.datosArticulo.nuevoArticulo.idDepartamento,
        idClase: this.datosArticulo.nuevoArticulo.idClase,
        idFamilia: this.datosArticulo.nuevoArticulo.idFamilia,
        stock: this.datosArticulo.nuevoArticulo.stock,
        cantidad: this.datosArticulo.nuevoArticulo.cantidad,
        descontinuado: this.datosArticulo.nuevoArticulo.descontinuado.toString(),
        fechaAlta: this.datosArticulo.nuevoArticulo.fechaAlta,
        fechaBaja: this.datosArticulo.nuevoArticulo.fechaBaja
      });
      
      this.idDepa = this.datosArticulo.nuevoArticulo.idDepartamento
      this.idCas = this.datosArticulo.nuevoArticulo.idClase
      this.esDeshabilitado = this.datosArticulo.nuevoArticulo.descontinuado == 1
      
      
      console.log(this.formArticulo);

      if(this.datosArticulo.nuevoSKU === ''){
        this.formArticulo.disable()
        this.esBuscar = true;
      }else{
        this.descontinuadoCheck = new FormControl({value: this.esDeshabilitado, disabled: false});
      }
    } else {
      this.formArticulo.patchValue({
        sku : parseInt(this.datosArticulo.nuevoSKU),
        fechaBaja: new Date(1900, 1, 1).toISOString(),
        fechaAlta: new Date().toISOString()
      })
    }
  }


  obtenerClases(){
    if(this.idDepa > 0){
      
      this._claseService.obtenerId(this.idDepa).subscribe({
        next: (data) => {
          if(data.isExitoso)
            this.listaClases = data.resultado;
        },
        error: error => {
          this._compartidoServico.mostrarAlerta(error.mensaje, "Error!")
        }
      });
    }
    
  }

  obtenerFamilias(){
    if(this.idCas > 0){
      this._familiaService.obternerId(this.idCas).subscribe({
        next: (data) => {
          if(data.isExitoso)
            this.listaFamilia = data.resultado;
        },
        error: error => {
          this._compartidoServico.mostrarAlerta(error.mensaje, "Error!")
        }
      });
    }
  }

  msgError(cantidad:number, stock:number){
    Swal.fire({
      title: 'Error',
      text: 'La cantidad ' + cantidad + ' es mayor que el stock ' + stock,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }

  crearModificarMedico(){
    let cant = parseInt(this.formArticulo.value.cantidad);
    let stock = parseInt(this.formArticulo.value.stock);
    if(cant > stock){
      this.msgError(cant, stock)
      return;
    }
    const articulo: Articulo = {
      idArticulo: this.datosArticulo.nuevoArticulo == null ? 0 : this.datosArticulo.nuevoArticulo.idArticulo,
      sku: this.formArticulo.value.sku,
      article: this.formArticulo.value.article,
      marca: this.formArticulo.value.marca,
      modelo: this.formArticulo.value.modelo,
      nombreDepartamento: '',
      idDepartamento: parseInt(this.formArticulo.value.idDepartamento), 
      nombreClase: '',
      idClase: parseInt(this.formArticulo.value.idClase),
      nombreFamilia: '',
      idFamilia: parseInt(this.formArticulo.value.idFamilia),
      stock: parseInt(this.formArticulo.value.stock),
      cantidad: parseInt(this.formArticulo.value.cantidad),
      descontinuado: this.descontinuadoCheck.value ? 1 : 0,
      fechaAlta: this.datosArticulo.nuevoArticulo == null ? new Date() : this.formArticulo.value.fechaAlta,
      fechaBaja: this.datosArticulo.nuevoArticulo == null ? new Date(1900, 1, 1) : this.formArticulo.value.fechaBaja
    }

    console.log(this.descontinuadoCheck);
    if(this.datosArticulo.nuevoArticulo == null){ // Guardar
      this._articuloServicio.crear(articulo).subscribe({
        next: (data) => {
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('El Articulo ha sido Creada con Exito','Completo');
            this.modal.close("true");
          } else {
            this._compartidoServico.mostrarAlerta('No se pudo Crear el Articulo','Error!');
          }
        },
        error: (e) => {
          this._compartidoServico.mostrarAlerta( e.error.errores,'No se pudo Crear el Articulo!');
        }
      })
    } else { //Editar
      this._articuloServicio.editar(articulo).subscribe({
        next: (data) => {
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('El Articulo ha sido Editada con Exito','Completo');
            this.modal.close("true");
          } else {
            this._compartidoServico.mostrarAlerta('No se pudo actualizar al Articulo','Error!');
          }
        },
        error: (e) => {
          this._compartidoServico.mostrarAlerta( e.error.errores,'No se pudo editar al Articulo!');
        }
      })
    }
  }
}
