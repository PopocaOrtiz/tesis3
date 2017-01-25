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
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ISeccion } from "./seccion.interface";
import { UsuariosService } from '../../usuarios/usuarios.service';
import { DataService } from "../../data.service";
export var SeccionDetalleNewComponent = (function () {
    function SeccionDetalleNewComponent(seccionService, router, usuariosService) {
        this.seccionService = seccionService;
        this.router = router;
        this.usuariosService = usuariosService;
        this.seccion = {
            id: 0,
            titulo: "",
            contenido: ""
        };
    }
    SeccionDetalleNewComponent.prototype.ngOnInit = function () {
        this.seccionService.setResource("/tutorial");
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
    };
    SeccionDetalleNewComponent.prototype.onChange = function () {
        console.log(this.seccion.contenido);
    };
    SeccionDetalleNewComponent.prototype.guardar = function () {
        var _this = this;
        var data = {
            titulo: this.seccion.titulo,
            contenido: this.seccion.contenido,
            seccion_padre: this.seccion.seccion_padre ? this.seccion.seccion_padre : '0'
        };
        this.seccionService.post(data)
            .subscribe(function () { return _this.router.navigate(['/tutorial']); });
    };
    SeccionDetalleNewComponent.prototype.cancelar = function () {
        this.router.navigate(['/tutorial']);
    };
    __decorate([
        Input(), 
        __metadata('design:type', ISeccion)
    ], SeccionDetalleNewComponent.prototype, "seccion", void 0);
    SeccionDetalleNewComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'seccion-detalle-edit',
            templateUrl: './seccion-detalle-edit.template.html'
        }), 
        __metadata('design:paramtypes', [DataService, Router, UsuariosService])
    ], SeccionDetalleNewComponent);
    return SeccionDetalleNewComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/tutorial/seccion/seccion-detalle-new.component.js.map