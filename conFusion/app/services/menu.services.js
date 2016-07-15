"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var MenuService = (function () {
    function MenuService(http) {
        this.http = http;
        this.menuURL = 'http://localhost:5555/dishes'; // URL to web api
    }
    MenuService.prototype.getDishes = function () {
        return this.http.get(this.menuURL)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    MenuService.prototype.getDish = function (id) {
        return this.getDishes().then(function (menus) { return menus.filter(function (menu) { return menu.id === id; })[0]; });
    };
    //combined post and put, if hero.id is given, put is run, else, its post
    MenuService.prototype.save = function (menu) {
        if (menu.id) {
            return this.put(menu);
        }
        return this.post(menu);
    };
    // Add new Hero
    MenuService.prototype.post = function (menu) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http.post(this.menuURL, JSON.stringify(menu), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Hero
    MenuService.prototype.put = function (menu) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.menuURL + "/" + menu.id;
        return this.http.put(url, JSON.stringify(menu), { headers: headers })
            .toPromise()
            .then(function () { return menu; })
            .catch(this.handleError);
    };
    //Delete hero
    MenuService.prototype.delete = function (menu) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.menuURL + "/" + menu.id;
        return this.http.delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    //Add comment
    MenuService.prototype.addcomment = function (comment, menu) {
        return this.http.get(this.menuURL + '/' + menu.id)
            .toPromise()
            .then(function (response) {
            //push comment to menu comment
            menu = response.json();
            menu.comments.push(comment);
            return menu;
        })
            .catch(this.handleError);
    };
    //add comment
    MenuService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=menu.services.js.map