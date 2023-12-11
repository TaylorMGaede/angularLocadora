import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Ator } from '../model/ator';
import { AtoresService } from '../service/atores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.component.html',
  styleUrls: ['./atores.component.scss']
})
export class AtoresComponent implements OnInit {

  atores$: Observable<Ator[]> | null = null;
  displayedColumns = ['_id','name', 'actions'];

  constructor(private atoresService: AtoresService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh() {
    this.atores$ = this.atoresService.list()
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  onEdit(ator: Ator) {
    this.router.navigate(['edit', ator._idAtor], { relativeTo: this.route })
  }
  onRemove(ator: Ator) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse ator?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.atoresService.remove(ator._idAtor).subscribe(
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
