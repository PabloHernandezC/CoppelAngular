import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { ClaseService } from './servicios/clase.service';
import { ListadoClasesComponent } from './pages/listado-clases/listado-clases.component';
import { ModalClasesComponent } from './modal/modal-clases/modal-clases.component';



@NgModule({
  declarations: [
    ListadoClasesComponent,
    ModalClasesComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],
  providers: [
    ClaseService,
  ]
})
export class ClaseModule { }
