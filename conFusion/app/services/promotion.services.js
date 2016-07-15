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
var PromotionService = (function () {
    function PromotionService(http) {
        this.http = http;
        this.promotionURL = 'http://localhost:5555/promotions'; // URL to web api
    }
    PromotionService.prototype.getPromotions = function () {
        return this.http.get(this.promotionURL)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    PromotionService.prototype.getPromotion = function (id) {
        return this.getPromotions().then(function (promotions) { return promotions.filter(function (promotion) { return promotion.id === id; })[0]; });
    };
    //combined post and put, if hero.id is given, put is run, else, its post
    PromotionService.prototype.save = function (promotion) {
        if (promotion.id) {
            return this.put(promotion);
        }
        return this.post(promotion);
    };
    // Add new Hero
    PromotionService.prototype.post = function (promotion) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.promotionURL, JSON.stringify(promotion), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Hero
    PromotionService.prototype.put = function (promotion) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.promotionURL + "/" + promotion.id;
        return this.http.put(url, JSON.stringify(promotion), { headers: headers })
            .toPromise()
            .then(function () { return promotion; })
            .catch(this.handleError);
    };
    //Delete hero
    PromotionService.prototype.delete = function (promotion) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.promotionURL + "/" + promotion.id;
        return this.http.delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    PromotionService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PromotionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PromotionService);
    return PromotionService;
}());
exports.PromotionService = PromotionService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=promotion.services.js.map