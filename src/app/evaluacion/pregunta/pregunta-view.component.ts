import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

// preguntas
import {IPregunta} from "./pregunta.interface"
import {PreguntasService} from "./preguntas.service"

// usuarios
import {IUsuario} from '../../usuarios/usuario.interface'
import {UsuariosService} from '../../usuarios/usuarios.service'
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'pregunta-view',
  styles: [``],
  templateUrl : './pregunta-view.template.html'
})

export class PreguntaViewComponent implements OnInit {

  user : IUsuario;
  pregunta : IPregunta;

  constructor(
    private preguntasService: DataService,
    private route: ActivatedRoute,
    private router :Router,
    private usuariosService : UsuariosService) { }

  ngOnInit(): void {

    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }

    this.route.params
      .switchMap((params: Params) => this.preguntasService.get(+params['id']))
      .subscribe(pregunta => {
        this.pregunta = pregunta.json() as IPregunta;
      });
  }
  delete(): void {
    this.preguntasService
      .delete(this.pregunta.id)
      .subscribe(() => {
        /*
         this.secciones = this.secciones.filter(h => h !== seccion);
         if (this.selectedSeccion === seccion) { this.selectedSeccion = null; }
         */
        this.router.navigate(['/evaluacion/preguntas']);
      });
  }
}
