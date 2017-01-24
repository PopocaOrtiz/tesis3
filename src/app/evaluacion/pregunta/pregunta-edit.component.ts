import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import {IPregunta} from "./pregunta.interface"
import {PreguntasService} from "./preguntas.service"

// auth
import {IUsuario} from '../../usuarios/usuario.interface'
import {UsuariosService} from '../../usuarios/usuarios.service'
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'pregunta-edit',
  styles: [``],
  templateUrl : './pregunta-new.template.html'
})

export class PreguntaEditComponent implements OnInit {

  pregunta : IPregunta;
  user : IUsuario;

  constructor(
    private preguntasService: DataService,
    private route: ActivatedRoute,
    private router:Router,
    private usuariosService : UsuariosService) { }

  ngOnInit(): void {

    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }
    this.preguntasService.setResource("/preguntas");
    this.route.params
      .switchMap((params: Params) => this.preguntasService.get(+params['id']))
      .subscribe(pregunta => {
        this.pregunta = pregunta.json() as IPregunta;
      });
  }
  onChange():void{
    console.log(this.pregunta.contenido);
  }
  guardar(): void {
    let opciones = this.pregunta.inputOpciones;
    this.pregunta.opciones = opciones.split("\n");
    this.preguntasService.update(this.pregunta.id,this.pregunta)
      .subscribe(() => this.router.navigate(['evaluacion/preguntas/view',this.pregunta.id]));
  }
  cancelar():void{
    this.router.navigate(['evaluacion/preguntas/view',this.pregunta.id]);
  }
}
