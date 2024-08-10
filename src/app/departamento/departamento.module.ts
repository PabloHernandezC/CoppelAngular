import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoDepartamentoComponent } from './pages/listado-departamento/listado-departamento.component';
import { ModalDepartamentoComponent } from './modal/modal-departamento/modal-departamento.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { DepartamentoService } from './servicios/departamento.service';


@NgModule({
  declarations: [
    ListadoDepartamentoComponent,
    ModalDepartamentoComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],
  providers: [
    DepartamentoService,
  ]
})
export class DepartamentoModule { }
