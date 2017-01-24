import { Component, Input, OnInit  } from '@angular/core';
import { Router }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SeccionService } from './seccion.service'
import { ISeccion } from "./seccion.interface"

// auth
import { IUsuario } from '../../usuarios/usuario.interface'
import { UsuariosService } from '../../usuarios/usuarios.service'
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'seccion-detalle-edit',
  templateUrl : './seccion-detalle-edit.template.html'
})
export class SeccionDetalleNewComponent implements OnInit {

  @Input()
  seccion: ISeccion = {
    id : 0,
    titulo : "",
    contenido : ""
  };

  user : IUsuario;

  constructor(  private seccionService: DataService,
                private router: Router,
                private usuariosService : UsuariosService
  ){}

  ngOnInit(): void {
    this.seccionService.setResource("/tutorial");
    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }
  }
  onChange():void{
    console.log(this.seccion.contenido);
  }
  guardar(): void {
    let data = {
      titulo : this.seccion.titulo,
      contenido : this.seccion.contenido,
      seccion_padre : this.seccion.seccion_padre ? this.seccion.seccion_padre : '0'
    };
    this.seccionService.post(data)
      .subscribe(() => this.router.navigate(['/tutorial']));
  }
  cancelar() : void{
    this.router.navigate(['/tutorial']);
  }
}
