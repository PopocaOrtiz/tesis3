import { Injectable }    from '@angular/core';

import {IUsuario} from './usuario.interface'
import {DataService} from "../data.service";

@Injectable()
export class UsuariosService{

  constructor(private dataService : DataService){
    this.dataService.setResource("/usuarios");
  }

  login(name: string,password:string){

    let data = {
      nombre: name,
      password:password
    };

    this.dataService.setResource('/usuarios');
    return this.dataService
        .list(data);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isLoged() : IUsuario{

    let userString = localStorage.getItem('currentUser');

    if(!userString)
      return null;

    let user = JSON.parse(userString);

    if(user)
      return user;
    else
      return null;
  }

  setIsLoged(user : string[]){
    let stringDataUsuario : string = JSON.stringify(user);
    localStorage.setItem('currentUser', stringDataUsuario);
  }
}
