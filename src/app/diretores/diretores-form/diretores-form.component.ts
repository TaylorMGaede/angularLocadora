import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { DiretoresService } from '../service/diretores.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Diretor } from '../model/diretor';

@Component( {
  selector: 'app-diretores-form',
  templateUrl: './diretores-form.component.html',
  styleUrls: ['./diretores-form.component.scss']
})
export class DiretoresFormComponent implements OnInit {

  form = this.formBuilder.group({
    _idDiretor: 0,
    name: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, 
    private service: DiretoresService, 
    private Location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const diretor: Diretor = this.route.snapshot.data['diretor'];
    this.form.setValue({_idDiretor: diretor._idDiretor, name: diretor.name});
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
