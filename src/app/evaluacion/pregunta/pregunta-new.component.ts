import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import {IPregunta} from "./pregunta.interface"
import {PreguntasService} from "./preguntas.service"
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'pregunta-new',
  styles: [``],
  templateUrl : './pregunta-new.template.html'
})

export class PreguntaNewComponent implements OnInit {

  pregunta : IPregunta;

  constructor(
    private preguntasService: DataService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.pregunta = {
      id : 0,
      titulo : "",
      contenido : ""
    };
  }
  onChange():void{
    console.log(this.pregunta.contenido);
  }
  guardar(): void {

    let opciones = this.pregunta.inputOpciones;
    this.pregunta.opciones = opciones.split("\n");

    this.preguntasService.post(this.pregunta)
      .subscribe(() => this.router.navigate(['evaluacion/preguntas']));
  }
  cancelar():void{
    this.router.navigate(['evaluacion/preguntas']);
  }
}
