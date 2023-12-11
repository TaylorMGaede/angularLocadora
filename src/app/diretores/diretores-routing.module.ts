import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiretoresComponent } from './diretores/diretores.component';
import { DiretoresFormComponent } from './diretores-form/diretores-form.component';
import { diretorResolver } from './guards/diretor.resolver';

const routes: Routes = [
  {path:'', component: DiretoresComponent },
  {path:'new', component: DiretoresFormComponent, resolve: {diretor: diretorResolver} },
  {path:'edit/:id', component: DiretoresFormComponent, resolve: {diretor: diretorResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiretoresRoutingModule { }