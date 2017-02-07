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
export var SeccionDetalleComponent = (function () {
    function SeccionDetalleComponent(seccionService, route, location, router, usuariosService) {
        this.seccionService = seccionService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.usuariosService = usuariosService;
    }
    SeccionDetalleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.seccionService.setResource('tutorial');
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
    SeccionDetalleComponent.prototype.ngOnDestroy = function () {
        this.cambioUrlSubscription.unsubscribe();
    };
    SeccionDetalleComponent.prototype.goBack = function () {
        this.location.back();
    };
    SeccionDetalleComponent.prototype.save = function () {
        var _this = this;
        this.seccionService.setResource('tutorial');
        this.seccionService.update(this.seccion.id.toString(), this.seccion)
            .subscribe(function () { return _this.goBack(); });
    };
    SeccionDetalleComponent.prototype.delete = function () {
        var _this = this;
        if (confirm("Eliminar esta seccion?")) {
            this.seccionService.setResource('tutorial');
            this.seccionService
                .delete(this.seccion.id)
                .subscribe(function () {
                _this.router.navigate(['/tutorial']);
            });
        }
    };
    SeccionDetalleComponent.prototype.agregarSubseccion = function () {
        var _this = this;
        var nombreSubseccion = prompt("Nombre de la subseccion: ");
        if (nombreSubseccion) {
            var nuevaSubseccion = {
                titulo: nombreSubseccion,
                contenido: "Ingresa el contenido de la seccion",
                seccion_padre: this.seccion.id,
            };
            if (!this.seccion.subSecciones)
                this.seccion.subSecciones = [];
            this.seccionService.setResource('tutorial');
            this.seccionService
                .post(nuevaSubseccion)
                .subscribe(function () {
                _this.router.navigate(['/tutorial']);
            });
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', ISeccion)
    ], SeccionDetalleComponent.prototype, "seccion", void 0);
    SeccionDetalleComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'seccion-detalle',
            templateUrl: './seccion-detalle.template.html',
            styles: ["\n    #articulo{\n      max-width: 900px;\n      margin: auto;\n      border: 1px solid silver;\n      color: #696969 !important;\n      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,sans-serif;\n      line-height: 1.5;\n      background-color: white;\n      padding: 40px;\n      font-size: 22px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [DataService, ActivatedRoute, Location, Router, UsuariosService])
    ], SeccionDetalleComponent);
    return SeccionDetalleComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/tutorial/seccion/seccion-detalle.component.js.map