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
import { UsuariosService } from "../../usuarios/usuarios.service";
import { Router } from "@angular/router";
import { RespuestasService } from "../resultados/respuestas.service";
export var EvaluacionNewComponent = (function () {
    function EvaluacionNewComponent(preguntasService, usuariosService, respuestasService, router) {
        this.preguntasService = preguntasService;
        this.usuariosService = usuariosService;
        this.respuestasService = respuestasService;
        this.router = router;
    }
    EvaluacionNewComponent.prototype.getPreguntas = function () {
        var _this = this;
        this.preguntas = [];
        this.preguntasService.list().subscribe(function (preguntas) {
            //despues de obtener las preguntas le mostramos al usuario solo 10
            var tmpPreguntas = preguntas;
            for (var i = 0; i < 10; i++) {
                //index random del array de preguntas
                var random = Math.floor(Math.random() * (tmpPreguntas.length - 1) + 1);
                if (preguntas[random].opciones) {
                    preguntas[random].opciones = preguntas[random].opciones.split(",");
                }
                _this.preguntas.push(preguntas[random]);
                preguntas.splice(random, 1);
            }
        });
    };
    EvaluacionNewComponent.prototype.ngOnInit = function () {
        this.getPreguntas();
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
    };
    EvaluacionNewComponent.prototype.guardar = function () {
        var idUsuario = this.user.id.toString().replace("Usuario ", "");
        for (var _i = 0, _a = this.preguntas; _i < _a.length; _i++) {
            var pregunta = _a[_i];
            if (!pregunta.respuesta) {
                alert("Contesta todas las preguntas");
                return;
            }
        }
        for (var _b = 0, _c = this.preguntas; _b < _c.length; _b++) {
            var pregunta = _c[_b];
            var correcta = "";
            if (pregunta.tipo == 2) {
                if (pregunta.respuesta == pregunta.opciones[0]) {
                    correcta = 'si';
                }
                else {
                    correcta = 'no';
                }
            }
            var postData = {
                usuarios: {
                    id: idUsuario
                },
                preguntas: {
                    id: pregunta.id.toString().replace("Pregunta ", "")
                },
                respuesta: pregunta.respuesta,
                correcta: correcta
            };
            this.respuestasService.post(postData)
                .subscribe();
        }
        this.usuariosService.setIsEvaluado(this.user)
            .subscribe();
        this.router.navigate(["evaluacion/resultados"]);
    };
    EvaluacionNewComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'evaluacion-new',
            styles: [""],
            templateUrl: './evaluacion-new.template.html'
        }), 
        __metadata('design:paramtypes', [PreguntasService, UsuariosService, RespuestasService, Router])
    ], EvaluacionNewComponent);
    return EvaluacionNewComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/evaluacion/evaluacion/evaluacion-new.component.js.map