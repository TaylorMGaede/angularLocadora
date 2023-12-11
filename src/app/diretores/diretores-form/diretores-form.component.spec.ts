import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoresFormComponent } from './diretores-form.component';

describe('DiretoresFormComponent', () => {
  let component: DiretoresFormComponent;
  let fixture: ComponentFixture<DiretoresFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretoresFormComponent]
    });
    fixture = TestBed.createComponent(DiretoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});