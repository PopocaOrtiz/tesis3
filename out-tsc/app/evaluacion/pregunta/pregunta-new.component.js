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
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from "../../data.service";
export var PreguntaNewComponent = (function () {
    function PreguntaNewComponent(preguntasService, route, router) {
        this.preguntasService = preguntasService;
        this.route = route;
        this.router = router;
    }
    PreguntaNewComponent.prototype.ngOnInit = function () {
        this.pregunta = {
            id: 0,
            titulo: "",
            contenido: ""
        };
    };
    PreguntaNewComponent.prototype.onChange = function () {
        console.log(this.pregunta.contenido);
    };
    PreguntaNewComponent.prototype.guardar = function () {
        var _this = this;
        var opciones = this.pregunta.inputOpciones;
        this.pregunta.opciones = opciones.split("\n");
        this.preguntasService.post(this.pregunta)
            .subscribe(function () { return _this.router.navigate(['evaluacion/preguntas']); });
    };
    PreguntaNewComponent.prototype.cancelar = function () {
        this.router.navigate(['evaluacion/preguntas']);
    };
    PreguntaNewComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'pregunta-new',
            styles: [""],
            templateUrl: './pregunta-new.template.html'
        }), 
        __metadata('design:paramtypes', [DataService, ActivatedRoute, Router])
    ], PreguntaNewComponent);
    return PreguntaNewComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/evaluacion/pregunta/pregunta-new.component.js.map