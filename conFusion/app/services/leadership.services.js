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
var LeadershipService = (function () {
    function LeadershipService(http) {
        this.http = http;
        this.leadershipURL = 'http://localhost:5555/leadership'; // URL to web api
    }
    LeadershipService.prototype.getLeaderships = function () {
        return this.http.get(this.leadershipURL)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    LeadershipService.prototype.getLeadership = function (id) {
        return this.getLeaderships().then(function (leaderships) { return leaderships.filter(function (leadership) { return leadership.id === id; })[0]; });
    };
    //combined post and put, if hero.id is given, put is run, else, its post
    LeadershipService.prototype.save = function (leadership) {
        if (leadership.id) {
            return this.put(leadership);
        }
        return this.post(leadership);
    };
    // Add new Hero
    LeadershipService.prototype.post = function (leadership) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.leadershipURL, JSON.stringify(leadership), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Hero
    LeadershipService.prototype.put = function (leadership) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.leadershipURL + "/" + leadership.id;
        return this.http.put(url, JSON.stringify(leadership), { headers: headers })
            .toPromise()
            .then(function () { return leadership; })
            .catch(this.handleError);
    };
    //Delete hero
    LeadershipService.prototype.delete = function (leadership) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.leadershipURL + "/" + leadership.id;
        return this.http.delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    LeadershipService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    LeadershipService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LeadershipService);
    return LeadershipService;
}());
exports.LeadershipService = LeadershipService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=leadership.services.js.map