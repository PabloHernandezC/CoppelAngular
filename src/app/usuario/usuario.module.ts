import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './servicios/usuario.service';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { ModalRegistroComponent } from './modal-registro/modal-registro.component';



@NgModule({
  declarations: [
    LoginComponent,
    ModalRegistroComponent,
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],
  exports:[
    LoginComponent
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuarioModule { }
