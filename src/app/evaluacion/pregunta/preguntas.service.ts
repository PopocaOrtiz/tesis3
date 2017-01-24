/**
 * @deprecated
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //There are scores of operators like toPromise that extend Observable with useful capabilities.

import {IPregunta} from './pregunta.interface'

@Injectable()
export class PreguntasService {

  private preguntasUrl = 'api/preguntas';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http){}

  getPreguntas():Promise<IPregunta[]>{
    return this.http.get(this.preguntasUrl)
      .toPromise()
      .then(response => response.json().data as IPregunta[])
      .catch(this.handleError);
  }

  getPregunta(id:number):Promise<IPregunta>{
    const url = `${this.preguntasUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as IPregunta)
      .catch(this.handleError);
  }

  update(pregunta: IPregunta): Promise<IPregunta> {
    const url = `${this.preguntasUrl}/${pregunta.id}`;
    return this.http
      .put(url, JSON.stringify(pregunta), {headers: this.headers})
      .toPromise()
      .then(() => pregunta)
      .catch(this.handleError);
  }

  create(pregunta: IPregunta): Promise<IPregunta> {
    return this.http
      .post(this.preguntasUrl, JSON.stringify(pregunta), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.preguntasUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
