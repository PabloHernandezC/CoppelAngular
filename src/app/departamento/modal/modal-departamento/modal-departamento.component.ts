import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from '../../interfaces/departamento';
import { DepartamentoService } from '../../servicios/departamento.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-departamento',
  templateUrl: './modal-departamento.component.html',
  styleUrl: './modal-departamento.component.css'
})
export class ModalDepartamentoComponent implements OnInit {

  formDepartamento: FormGroup;
  titulo: string = 'Agregar';
  nombreBoton: string = 'Guardar';

  constructor(
    private modal: MatDialogRef<ModalDepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosDepartamento: Departamento,
    private fb: FormBuilder,
    private _departamentoServicio: DepartamentoService,
    private _compartidoServico: CompartidoService
  ){
    this.formDepartamento = this.fb.group({
      nombre: ['',Validators.required],
    });
    
    if(this.datosDepartamento != null){
      this.titulo = 'Editar'
      this.nombreBoton = 'Actualizar'
    }
  }

  ngOnInit(): void {
    if(this.datosDepartamento != null){
      this.formDepartamento.patchValue({
        nombre: this.datosDepartamento.nombre
      })
    }
  }

  crearModificarDepartamento(){
    const departamento: Departamento = {
      idDepartamento: this.datosDepartamento == null ? 0 : this.datosDepartamento.idDepartamento,
      nombre: this.formDepartamento.value.nombre
    }
    if(this.datosDepartamento == null){ // Guardar
      this._departamentoServicio.crear(departamento).subscribe({
        next: (data) => {
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('La Departamento ha sido Creada con Exito','Completo');
            this.modal.close("true");
          } else {
            Swal.fire({
              title: 'No se pudo Crear la Departamento!',
              text: data.mensaje,
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
            })
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'No se pudo Crear la Departamento!',
            text: e.error.mensaje,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          })
        }
      })
    } else { //Editar
      this._departamentoServicio.editar(departamento).subscribe({
        next: (data) => {
          console.log(data)
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('La Departamento ha sido Editada con Exito','Completo');
            this.modal.close("true");
          } else {
            Swal.fire({
              title: 'No se pudo Crear la Departamento!',
              text: data.mensaje,
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
            })
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'No se pudo actualizar la Departamento!',
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
