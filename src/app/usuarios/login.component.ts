import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert/alert.service';
import { UsuariosService } from './usuarios.service'
import {debug} from "util";

@Component({
  //moduleId: module.id,
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UsuariosService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe( (response) => {
          debugger;
        let user = response.json();
        if(user.length) {
          this.authenticationService.setIsLoged(user[0]);
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.alertService.error("Login incorrecto");
          this.loading = false;
        }
      });
  }
}
