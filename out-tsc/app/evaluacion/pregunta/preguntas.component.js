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
import { Router } from '@angular/router';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { DataService } from "../../data.service";
export var PreguntasComponent = (function () {
    function PreguntasComponent(preguntasService, router, usuariosService) {
        this.preguntasService = preguntasService;
        this.router = router;
        this.usuariosService = usuariosService;
    }
    PreguntasComponent.prototype.getPreguntas = function () {
        var _this = this;
        this.preguntasService.setResource("preguntas");
        this.preguntasService.list().subscribe(function (preguntas) {
            _this.preguntas = preguntas;
        });
    };
    PreguntasComponent.prototype.onSelect = function (pregunta) {
        if (pregunta)
            this.selectedPregunta = pregunta;
        else
            this.selectedPregunta = {
                id: 0,
                titulo: "",
                contenido: ""
            };
    };
    PreguntasComponent.prototype.ngOnInit = function () {
        //this.getPreguntas();
        var _this = this;
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
        this.cambioUrlSubscription = this.router.events.subscribe(function (val) {
            _this.getPreguntas();
        });
    };
    PreguntasComponent.prototype.ngOnDestroy = function () {
        this.cambioUrlSubscription.unsubscribe();
    };
    PreguntasComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'preguntas',
            styles: [""],
            templateUrl: './preguntas.template.html'
        }), 
        __metadata('design:paramtypes', [DataService, Router, UsuariosService])
    ], PreguntasComponent);
    return PreguntasComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/evaluacion/pregunta/preguntas.component.js.map