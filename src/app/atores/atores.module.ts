import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtoresRoutingModule } from './atores-routing.module';
import { AtoresComponent } from './atores/atores.component';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AtoresFormComponent } from './atores-form/atores-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AtoresComponent,
    AtoresFormComponent
  ],
  imports: [
    CommonModule,
    AtoresRoutingModule,
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
export class AtoresModule { }
