import { Component } from '@angular/core';
import { OnInit,OnDestroy } from '@angular/core';

import {IPregunta} from "../pregunta/pregunta.interface"
import {PreguntasService} from "../pregunta/preguntas.service"

import {IEvaluacion} from "./interfaces"
import {EvaluacionService} from "./evaluacion.service"
import {DataService} from "../../data.service";

import {Subscription} from "rxjs";

@Component({
  //moduleId: module.id,
  selector: 'evaluacion-new',
  styles: [``],
  templateUrl : './evaluacion-new.template.html'
})

export class EvaluacionNewComponent implements OnInit {

  preguntas : IPregunta[];
  evaluacion : IEvaluacion;
  cambioUrlSubscription: Subscription;

  constructor(
    private preguntasService: DataService,
    private evaluacionService: EvaluacionService) { }

  getPreguntas(): void {
    this.preguntasService.list().subscribe(preguntas=>{
      this.preguntas=preguntas.json() as IPregunta[];
    });
  }

  ngOnInit(): void {
    this.getPreguntas();
  }

  guardar(): void {
    this.evaluacionService.create(this.evaluacion)
      .then(() => alert("Evaluacion guardada"));
  }
}
