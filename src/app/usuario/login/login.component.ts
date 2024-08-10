import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { CompartidoService } from '../../compartido/compartido.service';
import { Login } from '../interfeces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: FormGroup;
  ocultarPassword:boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private compartidoService: CompartidoService
  ){
    this.formLogin = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  iniciarSesion(){
    this.mostrarLoading = true;
    const request: Login = {
      userName: this.formLogin.value.userName,
      password: this.formLogin.value.password
    };

    this.usuarioService.iniciarSesion(request).subscribe({
      next: (response) => {
        this.compartidoService.guardarSesion(response);
        this.router.navigate(['layout']);
      },
      complete: () => this.mostrarLoading = false,
      error: error =>{
        this.mostrarLoading = false;
        console.log(error);
        this.compartidoService.mostrarAlerta(error.error, 'Error!');
      } 
    })

  }

}
