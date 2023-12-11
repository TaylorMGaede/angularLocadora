import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../model/classe';
import { ClassesService } from '../service/classes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classes$: Observable<Classe[]> | null = null;
  displayedColumns = ['_id','name', 'valor', 'date', 'actions'];

  constructor(private classesService: ClassesService, 
    private router: Router,
    public dialog: MatDialog, 
    private route: ActivatedRoute
    ) {
    this.refresh();
  }

  refresh() {
    this.classes$ = this.classesService.list()
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(classe: Classe) {
    this.router.navigate(['edit', classe._idClasse], {relativeTo: this.route})
  }
  onRemove(classe: Classe) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa classe?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.classesService.remove(classe._idClasse).subscribe(
          () => {
            this.refresh();
          }
        );
      }
    });
  }

  ngOnInit(): void {

  }
}