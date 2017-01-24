import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimuladorComponent } from './simulador/simulador.component';
import {SimuladorService} from "./simulador/simulador.service";
import {AppRoutingModule} from "./app-routing.module";

// editor html
import { CKEditorModule } from 'ng2-ckeditor';
import {SeccionesComponent} from "./tutorial/seccion/secciones.component";
import {SeccionDetalleComponent} from "./tutorial/seccion/seccion-detalle.component";
import {SeccionDetalleEditComponent} from "./tutorial/seccion/seccion-detalle-edit.component";
import {SeccionDetalleNewComponent} from "./tutorial/seccion/seccion-detalle-new.component";
import {EvaluacionComponent} from "./evaluacion/evaluacion/evaluacion.component";
import {EvaluacionNewComponent} from "./evaluacion/evaluacion/evaluacion-new.component";
import {PreguntasComponent} from "./evaluacion/pregunta/preguntas.component";
import {PreguntaViewComponent} from "./evaluacion/pregunta/pregunta-view.component";
import {PreguntaNewComponent} from "./evaluacion/pregunta/pregunta-new.component";
import {PreguntaEditComponent} from "./evaluacion/pregunta/pregunta-edit.component";
import {AlertComponent} from "./alert/alert.component";
import {LoginComponent} from "./usuarios/login.component";
import {SeccionService} from "./tutorial/seccion/seccion.service";
import {PreguntasService} from "./evaluacion/pregunta/preguntas.service";
import {EvaluacionService} from "./evaluacion/evaluacion/evaluacion.service";
import {AuthGuard} from "./usuarios/auth.guard";
import {AlertService} from "./alert/alert.service";
import {UsuariosService} from "./usuarios/usuarios.service";
import {DataService} from "./data.service";


@NgModule({
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

      LoginComponent
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
      AuthGuard,
      AlertService,
      UsuariosService,
      SimuladorService,
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
