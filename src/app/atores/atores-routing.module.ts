import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtoresComponent } from './atores/atores.component';
import { AtoresFormComponent } from './atores-form/atores-form.component';
import { atorResolver } from './guards/ator.resolver';

const routes: Routes = [
  {path:'', component: AtoresComponent },
  {path:'new', component: AtoresFormComponent, resolve: {ator: atorResolver} },
  {path:'edit/:id', component: AtoresFormComponent, resolve: {ator: atorResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtoresRoutingModule { }
