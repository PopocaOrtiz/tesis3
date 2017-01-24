import {Component, OnDestroy} from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params  }   from '@angular/router';
import {Subscription} from "rxjs";

// secciones
import {ISeccion} from "./seccion.interface"

// usuarios
import {IUsuario} from '../../usuarios/usuario.interface'
import {UsuariosService} from '../../usuarios/usuarios.service'

import 'rxjs/add/operator/switchMap';
import {DataService} from "../../data.service";

@Component({
  //moduleId: module.id,
  selector: 'secciones',
  styleUrls: ['./secciones.style.css'],
  templateUrl :'./secciones.template.html'
})
export class SeccionesComponent implements OnInit, OnDestroy {

  user : IUsuario;
  secciones : ISeccion[];
  selectedSeccion : ISeccion;
  idSelectedSeccion : number;
  cambioUrlSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private usuariosService : UsuariosService,
    private tutorialService : DataService) {
  }

  getSecciones(): void {

    let agregarSubSecciones = function(seccionPadre : ISeccion, secciones : ISeccion[]){
      let tmpSecciones : ISeccion[] = [];
      for(let seccion of secciones){
        if(seccion.seccion_padre==seccionPadre.id){
          seccion.id = parseInt(seccion.id.toString().replace("Tutorial ",""));
          seccion.subSecciones = agregarSubSecciones(seccion,secciones);
          tmpSecciones.push(seccion);
        }
      }
      return tmpSecciones;
    };

    this.tutorialService.list().subscribe(response=>{
      let secciones = response.json() as ISeccion[];
      //creamos el arbol de secciones empezando por la principal id:0
      let seccionPrincipal = {
        id: 0,
        titulo: "",
        contenido : "",
      };
      this.secciones = agregarSubSecciones(seccionPrincipal,secciones)
      console.log("Secciones",this.secciones);
    });
  }

  ngOnInit(): void {

    this.tutorialService.setResource("/tutorial");

    if(this.usuariosService.isLoged()){
      this.user = this.usuariosService.isLoged();
    }

    //this.getSecciones();

    this.cambioUrlSubscription = this.router.events.subscribe((val) => {
      this.getSecciones();
    });
  }
  ngOnDestroy(){
    this.cambioUrlSubscription.unsubscribe();
  }

  onSelect(seccion: ISeccion): void {
    this.selectedSeccion = seccion;
    this.idSelectedSeccion = seccion.id;
  }
  gotoDetail(): void {
    this.router.navigate(['/seccion', this.selectedSeccion.id]);
  }

  /*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.seccionService.create(name)
      .then(seccion => {
        this.secciones.push(seccion);
        this.selectedSeccion = null;
      });
  }
  */

}
