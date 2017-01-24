import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //There are scores of operators like toPromise that extend Observable with useful capabilities.

// evaluacion
import {IEvaluacion} from './interfaces'

@Injectable()
export class EvaluacionService {

  private evaluacionUrl = 'api/evaluacion';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http:Http
  ){}

  create(evaluacion: IEvaluacion): Promise<IEvaluacion> {
    return this.http
      .post(this.evaluacionUrl, JSON.stringify(evaluacion), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
