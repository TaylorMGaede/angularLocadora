import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { classeResolver } from './guards/classe.resolver';

const routes: Routes = [
  {path:'', component: ClassesComponent },
  {path:'new', component: ClassesFormComponent, resolve: {classe: classeResolver} },
  {path:'edit/:id', component: ClassesFormComponent, resolve: {classe: classeResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }