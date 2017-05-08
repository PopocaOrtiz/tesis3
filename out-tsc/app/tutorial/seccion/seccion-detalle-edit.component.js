var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ISeccion } from "./seccion.interface";
import { UsuariosService } from '../../usuarios/usuarios.service';
import { DataService } from "../../data.service";
export var SeccionDetalleEditComponent = (function () {
    function SeccionDetalleEditComponent(seccionService, route, router, location, usuariosService) {
        this.seccionService = seccionService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.usuariosService = usuariosService;
    }
    SeccionDetalleEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
        this.cambioUrlSubscription = this.route.params
            .switchMap(function (params) { return _this.seccionService.get(params['id']); })
            .subscribe(function (seccion) {
            _this.seccion = seccion;
            //this.seccion.id = parseInt(this.seccion.id.toString().replace("Tutorial ",""));
        });
    };
    SeccionDetalleEditComponent.prototype.ngOnDestroy = function () {
        this.cambioUrlSubscription.unsubscribe();
    };
    SeccionDetalleEditComponent.prototype.onChange = function () {
        console.log(this.seccion.contenido);
    };
    SeccionDetalleEditComponent.prototype.guardar = function () {
        var _this = this;
        var data = {
            titulo: this.seccion.titulo,
            contenido: this.seccion.contenido
        };
        var id = parseInt(this.seccion.id.toString().replace("Tutorial ", ""));
        this.seccionService.update(id.toString(), data)
            .subscribe(function () { return _this.router.navigate(['/tutorial/view/' + _this.seccion.id, { 'opcion': 'refresh' }]); });
    };
    SeccionDetalleEditComponent.prototype.cancelar = function () {
        this.router.navigate(['/tutorial/view/', this.seccion.id]);
    };
    __decorate([
        Input(), 
        __metadata('design:type', ISeccion)
    ], SeccionDetalleEditComponent.prototype, "seccion", void 0);
    SeccionDetalleEditComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'seccion-detalle-edit',
            templateUrl: './seccion-detalle-edit.template.html'
        }), 
        __metadata('design:paramtypes', [DataService, ActivatedRoute, Router, Location, UsuariosService])
    ], SeccionDetalleEditComponent);
    return SeccionDetalleEditComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/tutorial/seccion/seccion-detalle-edit.component.js.map