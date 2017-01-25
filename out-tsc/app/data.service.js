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
export var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.apiUrl = 'https://api.fieldbook.com/v1/5876d0a6c5c3de04003ad859';
        this.user = 'key-1';
        this.password = 'yhkjaE9ydECGyRHh3Jlb';
    }
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
        return this.getApiUrl() + this.getResource();
    };
    DataService.prototype.getRequestOptions = function () {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        headers.append("Authorization", "Basic " + btoa(this.user + ":" + this.password));
        return new RequestOptions({ headers: headers });
    };
    DataService.prototype.list = function (data) {
        if (data === void 0) { data = null; }
        var url = this.getEndPoint();
        if (data) {
            var params = [];
            for (var key in data) {
                params.push(key + '=' + encodeURIComponent(data[key]));
            }
            url = url + "?" + params.join("&");
        }
        return this.http
            .get(url, this.getRequestOptions());
    };
    DataService.prototype.get = function (id) {
        var url = this.getEndPoint() + '/' + id;
        return this.http.get(url, this.getRequestOptions());
    };
    DataService.prototype.post = function (data) {
        var url = this.getEndPoint();
        return this.http
            .post(url, JSON.stringify(data), this.getRequestOptions());
    };
    DataService.prototype.delete = function (id) {
        var url = this.getEndPoint() + '/' + id;
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
//# sourceMappingURL=C:/Users/user/Documents/GitHub/fibras/src/app/data.service.js.map