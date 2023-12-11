import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'inicio'},
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
  },

  {path:'', pathMatch: 'full', redirectTo: 'atores'},
  {
    path: 'atores',
    loadChildren: () => import('./atores/atores.module').then(m => m.AtoresModule)
  },

  {path:'', pathMatch: 'full', redirectTo: 'diretores'},
  {
    path: 'diretores',
    loadChildren: () => import('./diretores/diretores.module').then(m => m.DiretoresModule)
  },

  {path:'', pathMatch: 'full', redirectTo: 'classes'},
  {
    path: 'classes',
    loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule)
  },

  {path:'', pathMatch: 'full', redirectTo: 'titulos'},
  {
    path: 'titulos',
    loadChildren: () => import('./titulos/titulos.module').then(m => m.TitulosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
