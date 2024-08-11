import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CompartidoService } from '../../compartido/compartido.service';
import { Registro } from '../interfeces/registro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrl: './modal-registro.component.css'
})
export class ModalRegistroComponent {
  formRegistro: FormGroup;
  ocultarPassword:boolean = true;

  constructor(
    private modal: MatDialogRef<ModalRegistroComponent>,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _compartidoServico: CompartidoService
  ){
    this.formRegistro = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    });

  }

  crearRegistro(){
    const registro: Registro = {
      userName: this.formRegistro.value.userName,
      password: this.formRegistro.value.password
    }
    this._usuarioService.registro(registro).subscribe({
      next: (respuesta) => {
        this._compartidoServico.guardarSesion(respuesta);
        this.modal.close("true");
      } ,
      error: (e) => {
        Swal.fire({
          title: 'No se pudo registar al usuario',
          text: e.error,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        })
      }
    })

  }

}
