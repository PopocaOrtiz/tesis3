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
import { PreguntasService } from "../pregunta/preguntas.service";
import { RespuestasService } from "./respuestas.service";
import { UsuariosService } from "../../usuarios/usuarios.service";
export var ResultadosComponent = (function () {
    function ResultadosComponent(preguntasService, respuestasService, usuariosService) {
        this.preguntasService = preguntasService;
        this.respuestasService = respuestasService;
        this.usuariosService = usuariosService;
    }
    ResultadosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var usuario = this.usuariosService.isLoged();
        this.respuestasService.list({ 'usuarios': usuario.id.toString() })
            .subscribe(function (respuestas) { return _this.parseRespuestas(respuestas); });
    };
    ResultadosComponent.prototype.parseRespuestas = function (respuestas) {
        var _this = this;
        this.respuestasUsuario = [];
        var _loop_1 = function(respuesta) {
            var idPregunta = respuesta.preguntas[0].id.toString();
            this_1.preguntasService.get(idPregunta)
                .subscribe(function (pregunta) {
                var newRespuesta = {
                    correcta: respuesta.correcta == 'si',
                    pregunta: pregunta.titulo,
                    respuesta: respuesta.respuesta
                };
                _this.respuestasUsuario.push(newRespuesta);
            });
        };
        var this_1 = this;
        for (var _i = 0, respuestas_1 = respuestas; _i < respuestas_1.length; _i++) {
            var respuesta = respuestas_1[_i];
            _loop_1(respuesta);
        }
    };
    ResultadosComponent = __decorate([
        Component({
            selector: 'app-resultados',
            templateUrl: './resultados.component.html',
            styleUrls: ['./resultados.component.css']
        }), 
        __metadata('design:paramtypes', [PreguntasService, RespuestasService, UsuariosService])
    ], ResultadosComponent);
    return ResultadosComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/evaluacion/resultados/resultados.component.js.map