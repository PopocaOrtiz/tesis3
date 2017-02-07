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
import { UsuariosService } from '../../usuarios/usuarios.service';
export var EvaluacionComponent = (function () {
    function EvaluacionComponent(usuariosService) {
        this.usuariosService = usuariosService;
    }
    EvaluacionComponent.prototype.ngOnInit = function () {
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
    };
    EvaluacionComponent.prototype.onSelect = function (opcion) {
        this.opcion = opcion;
    };
    EvaluacionComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'evaluacion',
            styles: [""],
            templateUrl: './evaluacion.template.html'
        }), 
        __metadata('design:paramtypes', [UsuariosService])
    ], EvaluacionComponent);
    return EvaluacionComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/evaluacion/evaluacion/evaluacion.component.js.map