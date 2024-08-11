import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Familia } from '../../interfaces/familia';
import { FamiliaService } from '../../servicios/familia.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import Swal from 'sweetalert2';
import { ClaseService } from '../../../clase/servicios/clase.service';
import { Clase } from '../../../clase/interfaces/clase';

@Component({
  selector: 'app-modal-familia',
  templateUrl: './modal-familia.component.html',
  styleUrl: './modal-familia.component.css'
})
export class ModalFamiliaComponent implements OnInit {
  formFamilia: FormGroup;
  titulo: string = 'Agregar';
  nombreBoton: string = 'Guardar';
  listaClases: Clase[] = [];

  constructor(
    private modal: MatDialogRef<ModalFamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosFamilia: Familia,
    private fb: FormBuilder,
    private _familiaServicio: FamiliaService,
    private _compartidoServico: CompartidoService,
    private _claseServicio: ClaseService
  ){
    this.formFamilia = this.fb.group({
      nombreFamilia: ['',Validators.required],
      idClase: ['',Validators.required]
    });
    
    if(this.datosFamilia != null){
      this.titulo = 'Editar'
      this.nombreBoton = 'Actualizar'
    }

    this._claseServicio.lista().subscribe({
      next:data => {
        if(data.isExitoso){
          this.listaClases = data.resultado
        }
      },
      error: error=> console.log(error)
    })
  }

  ngOnInit(): void {
    if(this.datosFamilia != null){
      this.formFamilia.patchValue({
        nombreFamilia: this.datosFamilia.nombreFamilia,
        idClase: this.datosFamilia.idClase
      })
    }
  }

  crearModificarFamilia(){
    const familia: Familia = {
      idFamilia: this.datosFamilia == null ? 0 : this.datosFamilia.idFamilia,
      nombreFamilia: this.formFamilia.value.nombreFamilia,
      nombreClase : '',
      idClase: this.formFamilia.value.idClase
    }
    if(this.datosFamilia == null){ // Guardar
      this._familiaServicio.crear(familia).subscribe({
        next: (data) => {
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('La Familia ha sido Creada con Exito','Completo');
            this.modal.close("true");
          } else {
            Swal.fire({
              title: 'No se pudo Crear la Familia!',
              text: data.mensaje,
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
            })
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'No se pudo Crear la Familia!',
            text: e.error.mensaje,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          })
        }
      })
    } else { //Editar
      this._familiaServicio.editar(familia).subscribe({
        next: (data) => {
          console.log(data)
          if(data.isExitoso){
            this._compartidoServico.mostrarAlerta('La Familia ha sido Editada con Exito','Completo');
            this.modal.close("true");
          } else {
            Swal.fire({
              title: 'No se pudo Editar la Familia!',
              text: data.mensaje,
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
            })
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'No se pudo actualizar la Familia!',
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
