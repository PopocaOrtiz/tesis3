/**
 * @deprecated
 */
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
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export var SeccionService = (function () {
    function SeccionService(http) {
        this.http = http;
        this.seccionesUrl = 'api/secciones'; // URL to web api
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    SeccionService.prototype.getSecciones = function () {
        return this.http.get(this.seccionesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    SeccionService.prototype.getSeccion = function (id) {
        var url = this.seccionesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    SeccionService.prototype.update = function (seccion) {
        var url = this.seccionesUrl + "/" + seccion.id;
        return this.http
            .put(url, JSON.stringify(seccion), { headers: this.headers })
            .toPromise()
            .then(function () { return seccion; })
            .catch(this.handleError);
    };
    SeccionService.prototype.create = function (seccion) {
        return this.http
            .post(this.seccionesUrl, JSON.stringify(seccion), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    SeccionService.prototype.delete = function (id) {
        var url = this.seccionesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    SeccionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SeccionService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], SeccionService);
    return SeccionService;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/tutorial/seccion/seccion.service.js.map