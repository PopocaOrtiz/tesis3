var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { SimuladorService } from "./simulador/simulador.service";
import { AppRoutingModule } from "./app-routing.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { SeccionesComponent } from "./tutorial/seccion/secciones.component";
import { SeccionDetalleComponent } from "./tutorial/seccion/seccion-detalle.component";
import { SeccionDetalleEditComponent } from "./tutorial/seccion/seccion-detalle-edit.component";
import { SeccionDetalleNewComponent } from "./tutorial/seccion/seccion-detalle-new.component";
import { EvaluacionComponent } from "./evaluacion/evaluacion/evaluacion.component";
import { EvaluacionNewComponent } from "./evaluacion/evaluacion/evaluacion-new.component";
import { PreguntasComponent } from "./evaluacion/pregunta/preguntas.component";
import { PreguntaViewComponent } from "./evaluacion/pregunta/pregunta-view.component";
import { PreguntaNewComponent } from "./evaluacion/pregunta/pregunta-new.component";
import { PreguntaEditComponent } from "./evaluacion/pregunta/pregunta-edit.component";
import { AlertComponent } from "./alert/alert.component";
import { LoginComponent } from "./usuarios/login.component";
import { SeccionService } from "./tutorial/seccion/seccion.service";
import { PreguntasService } from "./evaluacion/pregunta/preguntas.service";
import { EvaluacionService } from "./evaluacion/evaluacion/evaluacion.service";
import { AuthGuard } from "./usuarios/auth.guard";
import { AlertService } from "./alert/alert.service";
import { UsuariosService } from "./usuarios/usuarios.service";
import { DataService } from "./data.service";
import { ListadoComponent } from './usuarios/listado/listado.component';
import { ResultadosComponent } from './evaluacion/resultados/resultados.component';
import { RespuestasService } from "./evaluacion/resultados/respuestas.service";
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                SimuladorComponent,
                SeccionesComponent,
                SeccionDetalleComponent,
                SeccionDetalleEditComponent,
                SeccionDetalleNewComponent,
                EvaluacionComponent,
                EvaluacionNewComponent,
                PreguntasComponent,
                PreguntaViewComponent,
                PreguntaNewComponent,
                PreguntaEditComponent,
                AlertComponent,
                LoginComponent,
                ListadoComponent,
                ResultadosComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                AppRoutingModule,
                CKEditorModule
            ],
            providers: [
                SeccionService,
                PreguntasService,
                EvaluacionService,
                RespuestasService,
                AuthGuard,
                AlertService,
                UsuariosService,
                SimuladorService,
                DataService
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/app.module.js.map