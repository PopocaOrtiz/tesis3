import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

// usuarios
import {IUsuario} from '../../usuarios/usuario.interface'
import {UsuariosService} from '../../usuarios/usuarios.service'

@Component({
  //moduleId: module.id,
  selector: 'evaluacion',
  styles: [``],
  templateUrl : './evaluacion.template.html'
})

export class EvaluacionComponent implements OnInit {

  user : IUsuario;
  private opcion : string;

  constructor(private usuariosService : UsuariosService) { }

  ngOnInit(): void {
    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }
  }

  onSelect(opcion:string):void{
    this.opcion = opcion;
  }
}
