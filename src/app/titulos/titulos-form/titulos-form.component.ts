import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { TitulosService } from '../service/titulos.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Titulo } from '../model/titulo';
import { Diretor } from 'src/app/diretores/model/diretor';
import { Classe } from 'src/app/classes/model/classe';
import { Ator } from 'src/app/atores/model/ator';
import { DiretoresService } from 'src/app/diretores/service/diretores.service';
import { ClassesService } from 'src/app/classes/service/classes.service';
import { AtoresService } from 'src/app/atores/service/atores.service';

@Component({
  selector: 'app-titulos-form',
  templateUrl: './titulos-form.component.html',
  styleUrls: ['./titulos-form.component.scss']
})
export class TitulosFormComponent implements OnInit {

  form = this.formBuilder.group({
    _idTitulo: 0,
    name: [''],
    year: 0,
    synopsis: [''],
    category: [''],
    diretor: this.formBuilder.group({
      _idDiretor: 0,
      name: ['']
    }),
    classe: this.formBuilder.group({
      _idClasse: 0,
      name: [''],
      valor: 0,
      date: ['']
    }),
    atores: this.formBuilder.array([])
  });
  
  diretores: Diretor[] = [];
  classes: Classe[] = [];
  atoresList: Ator[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: TitulosService,
    private diretoresService: DiretoresService,
    private classesService: ClassesService,
    private atoresService: AtoresService,
    private Location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.diretoresService.list().subscribe(diretores => this.diretores = diretores);
    this.classesService.list().subscribe(classes => this.classes = classes);
    this.atoresService.list().subscribe(atores => this.atoresList = atores);
  }

  onSubmit() {
    const idDiretor = this.form.value.diretor?._idDiretor;
    const idClasse = this.form.value.classe?._idClasse;

    const idTitulo = this.form.value._idTitulo ?? 0;
    const nameTitulo = this.form.value.name ?? '';
    const yearTitulo = this.form.value.year ?? 0;
    const synopsisTitulo = this.form.value.synopsis ?? '';
    const categoryTitulo = this.form.value.category ?? '';
  
    const isDiretorValid = idDiretor === null || (idDiretor !== undefined && this.diretores.map(diretor => diretor._idDiretor).includes(idDiretor));
    const isClasseValid = idClasse === null || (idClasse !== undefined && this.classes.map(classe => classe._idClasse).includes(idClasse));
    const isAtorValid = this.validateAtor();
  
    if (isDiretorValid && isClasseValid && isAtorValid) {
      const formularioDados = {
        ...this.form.value,
        _idTitulo: idTitulo,
        name: nameTitulo,
        year: yearTitulo,
        synopsis: synopsisTitulo,
        category: categoryTitulo,
        diretor: {
          _idDiretor: idDiretor !== null ? idDiretor : 0,
          name: this.form.value.diretor?.name ?? ''
        },
        classe: {
          _idClasse: idClasse !== null ? idClasse : 0,
          name: this.form.value.classe?.name ?? '',
          valor: this.form.value.classe?.valor ?? 0,
          date: this.form.value.classe?.date ?? ''
        }
      };
  
      this.service.save(formularioDados).subscribe(result => this.onSucess());
    } else {
      console.error('Diretor, Classe ou Ator selecionado não existem.');
    }
  }

  private validateAtor(): boolean {
    const atoresArray = this.form.value.atores as Array<number>;
    return atoresArray.every(atorId =>
      atorId === null || (atorId !== undefined && this.atoresList.map(ator => ator._idAtor).includes(atorId))
    );
  }

  addAtor() {
    const atorControl = this.formBuilder.group({
      _idAtor: [null],
      name: [''],
    });
    (this.form.get('atores') as FormArray).push(atorControl);
  }
  
  removeAtor(index: number) {
    (this.form.get('atores') as FormArray).removeAt(index);
  }

  getAtorControls() {
    return (this.form.get('atores') as FormArray).controls as FormGroup[];
  }

  /* addAtor() {
    const atorControl = this.formBuilder.control(null);
    (this.form.get('atores') as FormArray).push(atorControl);
  }
  
  removeAtor(index: number) {
    (this.form.get('atores') as FormArray).removeAt(index);
  } */

  /* private validateAtor(): boolean {
    const idAtorArray = this.form.value.ator as Array<{ _idAtor: number | null | undefined }>;
    return idAtorArray.every(ator =>
      ator?._idAtor === null || (ator?._idAtor !== undefined && this.atores.map(a => a._idAtor).includes(ator?._idAtor))
    );
  } */

  /* addAtor() {
    const atoresArray = this.form.get('atores') as FormArray;
    atoresArray.push(this.formBuilder.control(null));
  }

  removeAtor(index: number) {
    const atoresArray = this.form.get('atores') as FormArray;
    atoresArray.removeAt(index);
  } */

  // Obtém controles do array de atores para uso no template
  /* getAtorControls() {
    return (this.form.get('atores') as FormArray).controls;
  } */

  /* form = this.formBuilder.group({
    _idTitulo: 0,
    name: [''],
    year: 0,
    synopsis: [''],
    category: [''],
    diretor: this.formBuilder.group({
      _idDiretor: 0,
      name: ['']
    }),
    classe: this.formBuilder.group({
      _idClasse: 0,
      name: [''],
      valor: 0,
      date: ['']
    }),
    ator: this.formBuilder.array<Ator>([])
  });

  

  constructor(private formBuilder: NonNullableFormBuilder, 
    private service: TitulosService,
    private Location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const titulo: Titulo = this.route.snapshot.data['titulo'];

    this.form.patchValue({
      _idTitulo: titulo._idTitulo,
      name: titulo.name,
      year: titulo.year,
      synopsis: titulo.synopsis,
      category: titulo.category,
      diretor: {
        _idDiretor: titulo.diretor._idDiretor,
        name: titulo.diretor.name
      },
      classe: {
        _idClasse: titulo.classe._idClasse,
        name: titulo.classe.name,
        valor: titulo.classe.valor,
        date: titulo.classe.date
      }
    });

    const atoresFormArray = this.form.get('ator') as FormArray;
    titulo.ator.forEach(ator => {
      atoresFormArray.push(
        this.formBuilder.group({
          _idAtor: [ator._idAtor],
          name: [ator.name]
        })
      );
    });
  }

  onSubmit() {
    const formularioDados = {
      ...this.form.value,
      diretor: this.form.value.diretor as Diretor,
      classe: this.form.value.classe as Classe
    };

    this.service.save(formularioDados).subscribe(result => this.onSucess());
  } */

  onCancel() {
    this.Location.back();
  }

  onSucess() {
    this.onCancel();
  }
}
