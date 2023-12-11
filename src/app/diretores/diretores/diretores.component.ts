import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Diretor } from '../model/diretor';
import { DiretoresService } from '../service/diretores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-diretores',
  templateUrl: './diretores.component.html',
  styleUrls: ['./diretores.component.scss']
})
export class DiretoresComponent implements OnInit {

  diretores$: Observable<Diretor[]> | null = null;
  displayedColumns = ['_id','name', 'actions'];

  constructor(private diretoresService: DiretoresService, 
    private router: Router,
    public dialog: MatDialog, 
    private route: ActivatedRoute
    ) {
    this.refresh();
  }

  refresh() {
    this.diretores$ = this.diretoresService.list()
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(diretor: Diretor) {
    this.router.navigate(['edit', diretor._idDiretor], {relativeTo: this.route})
  }
  onRemove(diretor: Diretor) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse diretor?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.diretoresService.remove(diretor._idDiretor).subscribe(
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