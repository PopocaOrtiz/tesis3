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
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UsuariosService } from '../../usuarios/usuarios.service';
import 'rxjs/add/operator/switchMap';
import { DataService } from "../../data.service";
export var SeccionesComponent = (function () {
    function SeccionesComponent(router, route, usuariosService, tutorialService) {
        this.router = router;
        this.route = route;
        this.usuariosService = usuariosService;
        this.tutorialService = tutorialService;
    }
    SeccionesComponent.prototype.getSecciones = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        var agregarSubSecciones = function (seccionPadre, secciones) {
            var tmpSecciones = [];
            for (var _i = 0, secciones_1 = secciones; _i < secciones_1.length; _i++) {
                var seccion = secciones_1[_i];
                if (seccion.seccion_padre == seccionPadre.id) {
                    //seccion.id = parseInt(seccion.id.toString().replace("Tutorial ",""));
                    seccion.subSecciones = agregarSubSecciones(seccion, secciones);
                    tmpSecciones.push(seccion);
                }
            }
            return tmpSecciones;
        };
        this.tutorialService.list([], refresh).subscribe(function (response) {
            var secciones = response;
            //creamos el arbol de secciones empezando por la principal id:0
            var seccionPrincipal = {
                id: 0,
                titulo: "",
                contenido: "",
            };
            _this.secciones = agregarSubSecciones(seccionPrincipal, secciones);
            console.log("Secciones", _this.secciones);
        });
    };
    SeccionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tutorialService.setResource("tutorial");
        if (this.usuariosService.isLoged()) {
            this.user = this.usuariosService.isLoged();
        }
        this.cambioUrlSubscription = this.router.events.subscribe(function (val) {
            if (val instanceof NavigationEnd) {
                var recargar_1 = false;
                _this.route.params.forEach(function (params) {
                    if ("opcion" in params) {
                        if (params['opcion'] == 'refresh') {
                            recargar_1 = true;
                        }
                    }
                });
                _this.getSecciones(recargar_1);
            }
        });
    };
    SeccionesComponent.prototype.ngOnDestroy = function () {
        this.cambioUrlSubscription.unsubscribe();
    };
    SeccionesComponent.prototype.onSelect = function (seccion) {
        this.selectedSeccion = seccion;
        this.idSelectedSeccion = seccion.id;
    };
    SeccionesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/seccion', this.selectedSeccion.id]);
    };
    SeccionesComponent = __decorate([
        Component({
            //moduleId: module.id,
            selector: 'secciones',
            styleUrls: ['./secciones.style.css'],
            templateUrl: './secciones.template.html'
        }), 
        __metadata('design:paramtypes', [Router, ActivatedRoute, UsuariosService, DataService])
    ], SeccionesComponent);
    return SeccionesComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/tutorial/seccion/secciones.component.js.map