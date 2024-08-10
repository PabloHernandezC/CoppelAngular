import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { ArticuloService } from './servicios/articulo.service';
import { ListadoArticulosComponent } from './pages/listado-articulos/listado-articulos.component';
import { ModalArticuloComponent } from './modal/modal-articulo/modal-articulo.component';
import { DepartamentoService } from '../departamento/servicios/departamento.service';
import { FamiliaService } from '../familia/servicios/familia.service';
import { ClaseService } from '../clase/servicios/clase.service';

@NgModule({
  declarations: [
    ListadoArticulosComponent,
    ModalArticuloComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],
  providers: [
    ArticuloService,
    DepartamentoService,
    FamiliaService,
    ClaseService
  ]
})
export class ArticuloModule { }
