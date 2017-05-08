var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
export var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.apiUrl = 'https://api.fieldbook.com/v1/5876d0a6c5c3de04003ad859';
        this.user = 'key-1';
        this.password = 'yhkjaE9ydECGyRHh3Jlb';
        this.dataSaved = [];
    }
    DataService.prototype.loadDataLocal = function (url) {
        if (localStorage.getItem(url)) {
            console.log("Cargo " + url + " de memoria");
            this.dataSaved[url] = JSON.parse(localStorage.getItem(url));
        }
    };
    DataService.prototype.setResource = function (resource) {
        this.resource = resource;
    };
    DataService.prototype.getResource = function () {
        return this.resource;
    };
    DataService.prototype.getApiUrl = function () {
        return this.apiUrl;
    };
    DataService.prototype.getEndPoint = function () {
        return this.getApiUrl() + "/" + this.getResource();
    };
    DataService.prototype.getRequestOptions = function () {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        headers.append("Authorization", "Basic " + btoa(this.user + ":" + this.password));
        return new RequestOptions({ headers: headers });
    };
    DataService.prototype.list = function (data, reload) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (reload === void 0) { reload = false; }
        var url = this.getEndPoint();
        this.loadDataLocal(url);
        if (data) {
            if (data.length) {
                var params = [];
                for (var key in data) {
                    params.push(key + '=' + encodeURIComponent(data[key]));
                }
                url = url + "?" + params.join("&");
            }
        }
        //debugger;
        //si ya tenemos en memoria esta peticion evitamos volver a hacerla
        if (!reload) {
            if (url in this.dataSaved) {
                return Observable.of(this.dataSaved[url]);
            }
        }
        console.log("Peticion list a fieldbook para " + url);
        return this.http
            .get(url, this.getRequestOptions())
            .flatMap(function (response) {
            //lo guarda en el servicio actual
            _this.dataSaved[url] = response.json();
            //lo guarda en el local storage
            localStorage.setItem(url, response.text());
            return Observable.of(response.json());
        });
    };
    DataService.prototype.get = function (id, loadOfMemory) {
        var _this = this;
        if (loadOfMemory === void 0) { loadOfMemory = true; }
        var partsId = id.toString().split(" ");
        var newId = partsId[1];
        var url = this.getEndPoint();
        this.loadDataLocal(url);
        //si ya tenemos en memoria esta peticion evitamos volver a hacerla
        if (loadOfMemory) {
            if (url in this.dataSaved) {
                for (var _i = 0, _a = this.dataSaved[url]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var idItem = item.id.toString().split(" ");
                    if (idItem[1] == newId)
                        return Observable.of(item);
                }
            }
        }
        var fullUrl = url + '/' + newId;
        console.log("Peticion get a fieldbook para " + this.resource);
        return this.http.get(fullUrl, this.getRequestOptions())
            .flatMap(function (response) {
            //debugger;
            _this.dataSaved[url] = response.json();
            return Observable.of(response.json());
        });
    };
    DataService.prototype.post = function (data) {
        var url = this.getEndPoint();
        if ('id' in data) {
            //guardamos en memoria local
            if (localStorage.getItem(url)) {
                var previousData = JSON.parse(localStorage.getItem(url));
                previousData.push(data);
                localStorage.setItem(url, JSON.stringify(previousData));
            }
            else {
                localStorage.setItem(url, JSON.stringify([data]));
            }
        }
        return this.http
            .post(url, JSON.stringify(data), this.getRequestOptions());
    };
    DataService.prototype.delete = function (id) {
        var url = this.getEndPoint() + '/' + id;
        for (var key in this.dataSaved) {
            if (key == url) {
                this.dataSaved.splice(key, 1);
            }
        }
        localStorage.removeItem(url);
        return this.http.delete(url, this.getRequestOptions());
    };
    DataService.prototype.update = function (id, data) {
        var url = this.getEndPoint() + '/' + id;
        return this.http
            .patch(url, JSON.stringify(data), this.getRequestOptions());
    };
    DataService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], DataService);
    return DataService;
}());
//# sourceMappingURL=C:/Users/user/Documents/GitHub/tesis3/src/app/data.service.js.map