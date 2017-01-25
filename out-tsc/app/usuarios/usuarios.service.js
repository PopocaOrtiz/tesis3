var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { DataService } from "../data.service";
export var UsuariosService = (function () {
    function UsuariosService(dataService) {
        this.dataService = dataService;
        this.dataService.setResource("/usuarios");
    }
    UsuariosService.prototype.login = function (name, password) {
        var data = {
            nombre: name,
            password: password
        };
        this.dataService.setResource('/usuarios');
        return this.dataService
            .list(data);
    };
    UsuariosService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    UsuariosService.prototype.isLoged = function () {
        var userString = localStorage.getItem('currentUser');
        if (!userString)
            return null;
        var user = JSON.parse(userString);
        if (user)
            return user;
        else
            return null;
    };
    UsuariosService.prototype.setIsLoged = function (user) {
        var stringDataUsuario = JSON.stringify(user);
        localStorage.setItem('currentUser', stringDataUsuario);
    };
    UsuariosService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [DataService])
    ], UsuariosService);
    return UsuariosService;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/usuarios/usuarios.service.js.map