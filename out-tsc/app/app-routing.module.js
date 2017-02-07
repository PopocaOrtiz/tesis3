var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./usuarios/login.component";
import { SeccionesComponent } from "./tutorial/seccion/secciones.component";
import { SeccionDetalleNewComponent } from "./tutorial/seccion/seccion-detalle-new.component";
import { AuthGuard } from "./usuarios/auth.guard";
import { SeccionDetalleComponent } from "./tutorial/seccion/seccion-detalle.component";
import { SeccionDetalleEditComponent } from "./tutorial/seccion/seccion-detalle-edit.component";
import { EvaluacionComponent } from "./evaluacion/evaluacion/evaluacion.component";
import { PreguntasComponent } from "./evaluacion/pregunta/preguntas.component";
import { PreguntaViewComponent } from "./evaluacion/pregunta/pregunta-view.component";
import { PreguntaEditComponent } from "./evaluacion/pregunta/pregunta-edit.component";
import { PreguntaNewComponent } from "./evaluacion/pregunta/pregunta-new.component";
import { EvaluacionNewComponent } from "./evaluacion/evaluacion/evaluacion-new.component";
import { SimuladorComponent } from "./simulador/simulador.component";
import { ListadoComponent } from "./usuarios/listado/listado.component";
import { ResultadosComponent } from "./evaluacion/resultados/resultados.component";
var routes = [
    {
        path: '',
        redirectTo: '/tutorial',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'tutorial',
        component: SeccionesComponent,
        children: [
            {
                path: "new",
                component: SeccionDetalleNewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "view/:id",
                component: SeccionDetalleComponent,
            },
            {
                path: "edit/:id",
                component: SeccionDetalleEditComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'evaluacion',
        component: EvaluacionComponent,
        children: [
            {
                path: "preguntas",
                component: PreguntasComponent,
                children: [
                    {
                        path: "view/:id",
                        component: PreguntaViewComponent
                    },
                    {
                        path: "edit/:id",
                        component: PreguntaEditComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: "new",
                        component: PreguntaNewComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: "nueva",
                component: EvaluacionNewComponent
            },
            {
                path: "resultados",
                component: ResultadosComponent
            }
        ]
    },
    {
        path: 'simulador',
        component: SimuladorComponent,
    },
    {
        path: 'usuarios',
        component: ListadoComponent
    }
];
export var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/app-routing.module.js.map