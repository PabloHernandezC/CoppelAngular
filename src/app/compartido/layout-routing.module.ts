import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoArticulosComponent } from '../articulo/pages/listado-articulos/listado-articulos.component';
import { } from '../articulo/articulo.module';
import { } from '../clase/clase.module';
import {} from '../departamento/departamento.module';
import {} from '../familia/familia.module';
import { ListadoClasesComponent } from '../clase/pages/listado-clases/listado-clases.component';
import { ListadoDepartamentoComponent } from '../departamento/pages/listado-departamento/listado-departamento.component';
import { ListadoFamiliaComponent } from '../familia/pages/listado-familia/listado-familia.component';
import { authGuard } from '../_guards/auth.guard';

const routes : Routes = [
  {
    path: '', 
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
        {
            path:'',
            redirectTo: 'dashboard', 
            pathMatch:'full',
        },
      {
        path:'dashboard', 
        component: DashboardComponent,
      },
      {
        path:'articulo',
        component:ListadoArticulosComponent,
        pathMatch:'full'
      },
      {
        path:'clase',
        component:ListadoClasesComponent,
        pathMatch:'full'
      },
      {
        path:'departamento',
        component:ListadoDepartamentoComponent,
        pathMatch:'full'
      },
      {
        path:'familia',
        component:ListadoFamiliaComponent,
        pathMatch:'full'
      },
    ]
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class LayoutRoutingModule { }
