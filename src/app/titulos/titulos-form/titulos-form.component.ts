import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: TitulosService,
    private diretoresService: DiretoresService,
    private classesService: ClassesService,
    private atoresService: AtoresService,
    private Location: Location,
    private route: ActivatedRoute
  ) { }
  diretores: Diretor[] = [];
  classes: Classe[] = [];
  atoresList: Ator[] = [];

  ngOnInit() {
    const titulo: Titulo = this.route.snapshot.data['titulo'];

    this.form = this.formBuilder.group({
      _idTitulo: 0,
      name: titulo.name,
      year: titulo.year,
      synopsis: titulo.synopsis,
      category: titulo.category,
      diretor: titulo.diretor,
      classe: titulo.classe,
      atores: this.formBuilder.array([])
      //atores: titulo.ator
      //atores: [[]]
    });

    this.diretoresService.list().subscribe(diretores => this.diretores = diretores);
    this.classesService.list().subscribe(classes => this.classes = classes);
    this.atoresService.list().subscribe(atores => this.atoresList = atores);
    console.log("essa aqui = "+this.form.value.atores)
  }
  /* onSubmit(): void {
    const novoTitulo = this.form.value;
    this.service.save(novoTitulo).subscribe(
      (tituloCriado) => {
        console.log('Novo título criado:', tituloCriado);
        // Realize qualquer outra ação necessária após a criação do título
      },
      (erro) => {
        console.error('Erro ao criar novo título:', erro);
      }
    );
  } */

  onSubmit() {
    console.log(this.form.value)

    if (this.form.valid) {
      console.log("aaaaa "+ this.form.value.atores)
      
      this.service.save(this.form.value).subscribe(
        (response) => {
          this.onSucess()
          console.log('Título adicionado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao adicionar título:', error);
        }
      );
    }
  }

  addAtor() {
    const atorControl = this.formBuilder.group({
      ator: [null, Validators.required],
    });
    (this.form.get('atores') as FormArray).push(atorControl);
  }
  
  removeAtor(index: number) {
    (this.form.get('atores') as FormArray).removeAt(index);
  }

  getAtorControls() {
    return (this.form.get('atores') as FormArray).controls as FormGroup[];
  }

  onCancel() {
    this.Location.back();
  }

  onSucess() {
    this.onCancel();
  }
}
/* export class TitulosFormComponent implements OnInit {

  form = this.formBuilder.group({
    _idTitulo: [0],
    name: [''],
    year: [0],
    synopsis: [''],
    category: [''],
    diretor: this.formBuilder.group({
      _idDiretor: [0],
      name: ['']
    }),
    classe: this.formBuilder.group({
      _idClasse: [0],
      name: [''],
      valor: [0],
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
    const atoresArray = this.form.value.atores as Array<{ _idAtor: number | null }>;
    return atoresArray.every(ator =>
      ator._idAtor === null || (ator._idAtor !== undefined && this.atoresList.map(a => a._idAtor).includes(ator._idAtor))
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

  onCancel() {
    this.Location.back();
  }

  onSucess() {
    this.onCancel();
  }
} */
