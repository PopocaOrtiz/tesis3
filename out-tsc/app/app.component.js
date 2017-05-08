var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UsuariosService } from "./usuarios/usuarios.service";
export var AppComponent = (function () {
    function AppComponent(usuariosService) {
        this.usuariosService = usuariosService;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.usuariosService.isLoged()) {
            this.usuario = this.usuariosService.isLoged();
            var nombre = this.usuario.nombre;
            this.usuario.nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        }
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [UsuariosService])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/app.component.js.map