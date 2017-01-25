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
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { UsuariosService } from './usuarios.service';
export var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (response) {
            debugger;
            var user = response.json();
            if (user.length) {
                _this.authenticationService.setIsLoged(user[0]);
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this.alertService.error("Login incorrecto");
                _this.loading = false;
            }
        });
    };
    LoginComponent = __decorate([
        Component({
            //moduleId: module.id,
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [ActivatedRoute, Router, UsuariosService, AlertService])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/usuarios/login.component.js.map