import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFamiliaComponent } from './modal/modal-familia/modal-familia.component';
import { ListadoFamiliaComponent } from './pages/listado-familia/listado-familia.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { FamiliaService } from './servicios/familia.service';



@NgModule({
  declarations: [
    ModalFamiliaComponent,
    ListadoFamiliaComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],
  providers: [
    FamiliaService,
  ]
})
export class FamiliaModule { }
