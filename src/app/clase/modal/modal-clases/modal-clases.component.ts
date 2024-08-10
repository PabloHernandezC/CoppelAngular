import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClaseService } from '../../servicios/clase.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import { Clase } from '../../interfaces/clase';
import Swal from 'sweetalert2';
import { DepartamentoService } from '../../../departamento/servicios/departamento.service';
import { Departamento } from '../../../departamento/interfaces/departamento';

@Component({
  selector: 'app-modal-clases',
  templateUrl: './modal-clases.component.html',
  styleUrl: './modal-clases.component.css'
})
export class ModalClasesComponent implements OnInit{
  formClase: FormGroup;
  titulo: string = 'Agregar';
  nombreBoton: string = 'Guardar';
  listaDepartamentos : Departamento[] = []

  constructor(
    private modal: MatDialogRef<ModalClasesComponent>,
    @Inject(MAT_DIALOG_DATA) public datosClase: Clase,
    private fb: FormBuilder,
    private _claseServicio: ClaseService,
    private _compartidoServico: CompartidoService,
    private _departamentoService: DepartamentoService
  ){
    this.formClase = this.fb.group({
      nombreClase: ['',Validators.required],
      idDepartamento: ['',Validators.required]
    });
    
    if(this.datosClase != null){
      this.titulo = 'Editar'
      this.nombreBoton = 'Actualizar'
    }
    
    this._departamentoService.lista().subscribe({
      next: data => {
        if(data.isExitoso){
          this.listaDepartamentos = data.resultado;
        }
      },
      error: error => console.log(error)
    });

  }

  ngOnInit(): void {
    if(this.datosClase != null){
      this.formClase.patchValue({
        nombreClase: this.datosClase.nombreClase,
        idDepartamento: this.datosClase.idDepartamento
      })
    }
  }

  crearModificarClase(){
    const clase: Clase = {
      idClase: this.datosClase == null ? 0 : this.datosClase.idClase,
      nombreClase: this.formClase.value.nombreClase,
      idDepartamento: this.formClase.value.idDepartamento,
      nombreDepartamento : ''
    }
    if(this.datosClase == null){ // Guardar
      this._claseServicio.crear(clase).subscribe({
        next: (data) => {
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('La Clase ha sido Creada con Exito','Completo');
            this.modal.close("true");
          } else {
            this._compartidoServico.mostrarAlerta('No se pudo Crear la Clase','Error!');
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'No se pudo Crear la Clase!',
            text: e.error.mensaje,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          })
        }
      })
    } else { //Editar
      this._claseServicio.editar(clase).subscribe({
        next: (data) => {
          console.log(data)
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('La Clase ha sido Editada con Exito','Completo');
            this.modal.close("true");
          } else {
            this._compartidoServico.mostrarAlerta('No se pudo actualizar la Clase','Error!');
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'No se pudo actualizar la Clase!',
            text: e.error.mensaje,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          })
        }
      })
    }
  }

}
