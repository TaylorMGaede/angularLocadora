import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiretoresRoutingModule } from './diretores-routing.module';
import { DiretoresComponent } from './diretores/diretores.component';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DiretoresFormComponent } from './diretores-form/diretores-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DiretoresComponent,
    DiretoresFormComponent
  ],
  imports: [
    CommonModule,
    DiretoresRoutingModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule
  ]
})
export class DiretoresModule { }