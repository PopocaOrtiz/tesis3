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
export var PreguntasService = (function () {
    function PreguntasService(http) {
        this.http = http;
        this.preguntasUrl = 'api/preguntas'; // URL to web api
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    PreguntasService.prototype.getPreguntas = function () {
        return this.http.get(this.preguntasUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    PreguntasService.prototype.getPregunta = function (id) {
        var url = this.preguntasUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    PreguntasService.prototype.update = function (pregunta) {
        var url = this.preguntasUrl + "/" + pregunta.id;
        return this.http
            .put(url, JSON.stringify(pregunta), { headers: this.headers })
            .toPromise()
            .then(function () { return pregunta; })
            .catch(this.handleError);
    };
    PreguntasService.prototype.create = function (pregunta) {
        return this.http
            .post(this.preguntasUrl, JSON.stringify(pregunta), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PreguntasService.prototype.delete = function (id) {
        var url = this.preguntasUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PreguntasService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    PreguntasService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], PreguntasService);
    return PreguntasService;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/evaluacion/pregunta/preguntas.service.js.map