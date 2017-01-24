/**
 * @deprecated
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //There are scores of operators like toPromise that extend Observable with useful capabilities.

import {ISeccion} from './seccion.interface'

@Injectable()
export class SeccionService {

  private seccionesUrl = 'api/secciones';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http){}

  getSecciones():Promise<ISeccion[]>{
    return this.http.get(this.seccionesUrl)
      .toPromise()
      .then(response => response.json().data as ISeccion[])
      .catch(this.handleError);
  }

  getSeccion(id:number):Promise<ISeccion>{
    const url = `${this.seccionesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ISeccion)
      .catch(this.handleError);
  }

  update(seccion: ISeccion): Promise<ISeccion> {
    const url = `${this.seccionesUrl}/${seccion.id}`;
    return this.http
      .put(url, JSON.stringify(seccion), {headers: this.headers})
      .toPromise()
      .then(() => seccion)
      .catch(this.handleError);
  }

  create(seccion: ISeccion): Promise<ISeccion> {
    return this.http
      .post(this.seccionesUrl, JSON.stringify(seccion), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.seccionesUrl}/${id}`;
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
