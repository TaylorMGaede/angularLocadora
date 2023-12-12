import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AtoresService } from '../service/atores.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Ator } from '../model/ator';

@Component( {
  selector: 'app-atores-form',
  templateUrl: './atores-form.component.html',
  styleUrls: ['./atores-form.component.scss']
})
export class AtoresFormComponent implements OnInit {

  form = this.formBuilder.group({
    _idAtor: 0,
    name: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, 
    private service: AtoresService, 
    private Location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const ator: Ator = this.route.snapshot.data['ator'];
    this.form.setValue({_idAtor: ator._idAtor, name: ator.name});
  }

  onSubmit() {
    console.log(this.form.value)
    console.log("o id no onSubmit = " + this.form.value._idAtor)
    this.service.save(this.form.value).subscribe(result => this.onSucess())
  }

  onCancel() {
    this.Location.back();
  }

  onSucess() {
    this.onCancel();
  }
}
