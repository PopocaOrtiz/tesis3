import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class DataService {

  private apiUrl: string = 'https://api.fieldbook.com/v1/5876d0a6c5c3de04003ad859';
  private user : string = 'key-1';
  private password : string = 'yhkjaE9ydECGyRHh3Jlb';
  private resource : string;

  constructor(private http : Http) {
  }

  setResource(resource : string){
   this.resource = resource;
  }

  getResource() : string{
    return this.resource;
  }

  getApiUrl() : string{
    return this.apiUrl;
  }

  getEndPoint() : string{
    return this.getApiUrl()+this.getResource();
  }

  getRequestOptions() : RequestOptions{
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    headers.append("Authorization", "Basic " + btoa(this.user+":"+this.password));

    return new RequestOptions({headers: headers});
  }

  list(data : any = null){

    let url = this.getEndPoint();

    if(data){
      let params : string[] = [];
      for(let key in data){
        params.push(key + '=' + encodeURIComponent(data[key]));
      }
      url = url + "?"+params.join("&");
    }

    return this.http
        .get(url, this.getRequestOptions());
  }

  get(id: number){
    let url = this.getEndPoint()+'/'+id;
    return this.http.get(url, this.getRequestOptions());
  }

  post(data : any){

    let url = this.getEndPoint();

    return this.http
        .post(url, JSON.stringify(data), this.getRequestOptions());
  }

  delete(id: number){
    let url = this.getEndPoint()+'/'+id;
    return this.http.delete(url, this.getRequestOptions());
  }

  update(id:number,data:any){
    let url = this.getEndPoint()+'/'+id;
    return this.http
        .patch(url, JSON.stringify(data), this.getRequestOptions());
  }
}