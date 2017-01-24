import { Component, Input, OnInit  } from '@angular/core';
import { ActivatedRoute, Params , Router }   from '@angular/router';
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
  selector: 'seccion-detalle',
  templateUrl : './seccion-detalle.template.html',
  styles : [`
    #articulo{
      max-width: 900px;
      margin: auto;
      border: 1px solid silver;
      color: #696969 !important;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,sans-serif;
      line-height: 1.5;
      background-color: white;
      padding: 40px;
      font-size: 22px;
    }
  `]
})
export class SeccionDetalleComponent implements OnInit {

  @Input()
  seccion: ISeccion;

  user : IUsuario;

  constructor(  private seccionService: DataService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router,
                private usuariosService : UsuariosService
  ){}

  ngOnInit(): void {
    this.seccionService.setResource('/tutorial');
    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }

    this.route.params
      .switchMap((params: Params) => this.seccionService.get(+params['id']))
      .subscribe(seccion =>{
        this.seccion = seccion.json() as ISeccion;
        this.seccion.id = parseInt(this.seccion.id.toString().replace("Tutorial ",""));
      });
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.seccionService.setResource('/tutorial');
    this.seccionService.update(this.seccion.id,this.seccion)
        .subscribe(()=>this.goBack());
  }
  delete(): void {
    if(confirm("Eliminar esta seccion?")){
      this.seccionService.setResource('/tutorial');
      this.seccionService
        .delete(this.seccion.id)
        .subscribe(() => {
          this.router.navigate(['/tutorial']);
        });
    }
  }
  agregarSubseccion(): void {
    let nombreSubseccion = prompt("Nombre de la subseccion: ");
    if(nombreSubseccion){

      let nuevaSubseccion = {
        titulo: nombreSubseccion,
        contenido : "Ingresa el contenido de la seccion",
        seccion_padre : this.seccion.id,
      };

      if(!this.seccion.subSecciones)
        this.seccion.subSecciones = [];

      this.seccionService.setResource('/tutorial');
      this.seccionService
        .post(nuevaSubseccion)
        .subscribe(() => {
          this.router.navigate(['/tutorial']);
        });
    }
  }
}
