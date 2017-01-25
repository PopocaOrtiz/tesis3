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
import { UsuariosService } from '../../usuarios/usuarios.service';
import { DataService } from "../../data.service";
export var PreguntaEditComponent = (function () {
    function PreguntaEditComponent(preguntasService, route, router, usuariosService) {
        this.preguntasService = preguntasService;
        this.route = route;
        this.router = router;
        this.usuariosService = usuariosService;
    }
    PreguntaEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
        this.preguntasService.setResource("/preguntas");
        this.route.params
            .switchMap(function (params) { return _this.preguntasService.get(+params['id']); })
            .subscribe(function (pregunta) {
            _this.pregunta = pregunta.json();
        });
    };
    PreguntaEditComponent.prototype.onChange = function () {
        console.log(this.pregunta.contenido);
    };
    PreguntaEditComponent.prototype.guardar = function () {
        var _this = this;
        var opciones = this.pregunta.inputOpciones;
        this.pregunta.opciones = opciones.split("\n");
        this.preguntasService.update(this.pregunta.id, this.pregunta)
            .subscribe(function () { return _this.router.navigate(['evaluacion/preguntas/view', _this.pregunta.id]); });
    };
    PreguntaEditComponent.prototype.cancelar = function () {
        this.router.navigate(['evaluacion/preguntas/view', this.pregunta.id]);
    };
    PreguntaEditComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'pregunta-edit',
            styles: [""],
            templateUrl: './pregunta-new.template.html'
        }), 
        __metadata('design:paramtypes', [DataService, ActivatedRoute, Router, UsuariosService])
    ], PreguntaEditComponent);
    return PreguntaEditComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/evaluacion/pregunta/pregunta-edit.component.js.map