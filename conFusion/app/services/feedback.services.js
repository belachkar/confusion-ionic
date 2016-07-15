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
var FeedbackServices = (function () {
    function FeedbackServices(http) {
        this.http = http;
        this.feedbackURL = 'http://localhost:5555/feedback'; // URL to web api
    }
    FeedbackServices.prototype.getFeedbacks = function () {
        return this.http.get(this.feedbackURL)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    FeedbackServices.prototype.getFeedback = function (id) {
        return this.getFeedbacks().then(function (feedbacks) { return feedbacks.filter(function (feedback) { return feedback.id === id; })[0]; });
    };
    //combined post and put, if hero.id is given, put is run, else, its post
    FeedbackServices.prototype.save = function (feedback) {
        if (feedback.id) {
            return this.put(feedback);
        }
        return this.post(feedback);
    };
    // Add new Hero
    FeedbackServices.prototype.post = function (feedback) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.feedbackURL, JSON.stringify(feedback), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Hero
    FeedbackServices.prototype.put = function (feedback) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.feedbackURL + "/" + feedback.id;
        return this.http.put(url, JSON.stringify(feedback), { headers: headers })
            .toPromise()
            .then(function () { return feedback; })
            .catch(this.handleError);
    };
    //Delete hero
    FeedbackServices.prototype.delete = function (feedback) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.feedbackURL + "/" + feedback.id;
        return this.http.delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    FeedbackServices.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    FeedbackServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FeedbackServices);
    return FeedbackServices;
}());
exports.FeedbackServices = FeedbackServices;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=feedback.services.js.map