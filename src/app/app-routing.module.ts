import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./usuarios/login.component";
import {SeccionesComponent} from "./tutorial/seccion/secciones.component";
import {SeccionDetalleNewComponent} from "./tutorial/seccion/seccion-detalle-new.component";
import {AuthGuard} from "./usuarios/auth.guard";
import {SeccionDetalleComponent} from "./tutorial/seccion/seccion-detalle.component";
import {SeccionDetalleEditComponent} from "./tutorial/seccion/seccion-detalle-edit.component";
import {EvaluacionComponent} from "./evaluacion/evaluacion/evaluacion.component";
import {PreguntasComponent} from "./evaluacion/pregunta/preguntas.component";
import {PreguntaViewComponent} from "./evaluacion/pregunta/pregunta-view.component";
import {PreguntaEditComponent} from "./evaluacion/pregunta/pregunta-edit.component";
import {PreguntaNewComponent} from "./evaluacion/pregunta/pregunta-new.component";
import {EvaluacionNewComponent} from "./evaluacion/evaluacion/evaluacion-new.component";
import {SimuladorComponent} from "./simulador/simulador.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tutorial',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component : LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'tutorial',
        component: SeccionesComponent,
        children : [
            {
                path : "new",
                component : SeccionDetalleNewComponent,
                canActivate: [AuthGuard]
            },
            {
                path : "view/:id",
                component : SeccionDetalleComponent,
            },
            {
                path : "edit/:id",
                component : SeccionDetalleEditComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'evaluacion',
        component: EvaluacionComponent,
        children : [
            {
                path : "preguntas",
                component : PreguntasComponent,
                children : [
                    {
                        path : "view/:id",
                        component : PreguntaViewComponent
                    },
                    {
                        path : "edit/:id",
                        component : PreguntaEditComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path : "new",
                        component : PreguntaNewComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path : "nueva",
                component : EvaluacionNewComponent
            },
        ]
    },
    {
        path: 'simulador',
        component: SimuladorComponent,
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

