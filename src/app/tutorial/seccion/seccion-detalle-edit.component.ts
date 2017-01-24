import { Component, Input, OnInit  } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { SeccionService } from './seccion.service'
import {ISeccion} from "./seccion.interface"

// auth
import {IUsuario} from '../../usuarios/usuario.interface'
import {UsuariosService} from '../../usuarios/usuarios.service'
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'seccion-detalle-edit',
  templateUrl : './seccion-detalle-edit.template.html'
})
export class SeccionDetalleEditComponent implements OnInit {

  @Input()
  seccion: ISeccion;

  user : IUsuario;

  constructor(  private seccionService: DataService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private usuariosService : UsuariosService
  ){}

  ngOnInit(): void {

    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }

    this.route.params
      .switchMap((params: Params) => this.seccionService.get(+params['id']))
      .subscribe(seccion => {
        this.seccion = seccion.json() as ISeccion;
        this.seccion.id = parseInt(this.seccion.id.toString().replace("Tutorial ",""));
      });
  }
  onChange():void{
    console.log(this.seccion.contenido);
  }
  guardar(): void {
    let data = {
      titulo : this.seccion.titulo,
      contenido : this.seccion.contenido
    };
    this.seccionService.update(this.seccion.id,data)
      .subscribe(() => this.router.navigate(['/tutorial/view/',this.seccion.id]));

  }
  cancelar() : void{
    this.router.navigate(['/tutorial/view/', this.seccion.id]);
  }
}
