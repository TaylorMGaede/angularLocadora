import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ClassesService } from '../service/classes.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Classe } from '../model/classe';

@Component( {
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _idClasse: 0,
    name: [''],
    valor: 0,
    date: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, 
    private service: ClassesService, 
    private Location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const classe: Classe = this.route.snapshot.data['classe'];
    this.form.setValue({_idClasse: classe._idClasse, name: classe.name, valor: classe.valor, date: classe.date});
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess())
  }

  onCancel() {
    this.Location.back();
  }

  onSucess() {
    this.onCancel();
  }
}
