import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitulosComponent } from './titulos/titulos.component';
import { TitulosFormComponent } from './titulos-form/titulos-form.component';
import { tituloResolver } from './guards/titulo.resolver';

const routes: Routes = [
  {path:'', component: TitulosComponent },
  {path:'new', component: TitulosFormComponent, resolve: {titulo: tituloResolver} },
  {path:'edit/:id', component: TitulosFormComponent, resolve: {titulo: tituloResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitulosRoutingModule { }