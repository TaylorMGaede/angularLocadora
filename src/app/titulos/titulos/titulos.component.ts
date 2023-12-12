import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Titulo } from '../model/titulo';
import { TitulosService } from '../service/titulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.scss']
})
export class TitulosComponent implements OnInit {

  titulos$: Observable<Titulo[]> | null = null;
  displayedColumns = ['_id','name', 'atorNames', 'diretorName', 'year', 'synopsis', 'category', 'className', 'classValor', 'classDate', 'actions'];

  constructor(private titulosService: TitulosService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh() {  
    this.titulos$ = this.titulosService.list()
    console.log(this.titulos$)
  }

  onAdd() {
    console.log(this.route)
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  onEdit(titulo: Titulo) {
    this.router.navigate(['edit', titulo._idTitulo], { relativeTo: this.route })
  }
  onRemove(titulo: Titulo) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse titulo?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.titulosService.remove(titulo._idTitulo).subscribe(
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
