import {Component, OnDestroy} from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params  }   from '@angular/router';
import {Subscription} from "rxjs";

// preguntas
import {IPregunta} from "./pregunta.interface"
import {PreguntasService} from "./preguntas.service"

// usuarios
import {IUsuario} from '../../usuarios/usuario.interface'
import {UsuariosService} from '../../usuarios/usuarios.service'
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'preguntas',
  styles: [``],
  templateUrl : './preguntas.template.html'
})

export class PreguntasComponent implements OnInit,OnDestroy {

  user : IUsuario;
  preguntas : IPregunta[];
  selectedPregunta : IPregunta;
  cambioUrlSubscription: Subscription;

  constructor(
    private preguntasService: DataService,
    private router : Router,
    private usuariosService : UsuariosService) { }

  getPreguntas(): void {
    this.preguntasService.setResource("/preguntas");
    this.preguntasService.list().subscribe(preguntas=>{
          this.preguntas=preguntas.json() as IPregunta[];
    });
  }

  onSelect(pregunta : IPregunta) : void{
    if(pregunta)
      this.selectedPregunta = pregunta;
    else
      this.selectedPregunta = {
        id : 0,
        titulo : "",
        contenido : ""
      };
  }

  ngOnInit(): void {

    //this.getPreguntas();

    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }

    this.cambioUrlSubscription = this.router.events.subscribe((val) => {
      this.getPreguntas();
    });
  }
  ngOnDestroy(){
    this.cambioUrlSubscription.unsubscribe();
  }
}
