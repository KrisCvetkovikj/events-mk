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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var _ = require("underscore");
var store_1 = require("./store.service");
var Rx_1 = require("rxjs/Rx");
var ApiService = (function () {
    function Api(_http, _store) {
        var _this = this;
        this._http = _http;
        this._store = _store;
        this.token = "EAANgFkSB8gEBADQZCfnic2ts5vnMHrTt7F8sf9q1dZA53ukFs3AKLC46PogISnZBAeDzInoIynSkkhv8jEGZAA3JXoDC3vAn9SJti2Xfz4liZAh9fiXJTs5NOgOpj7zqe44g6m3fZAlDnI2tDjjqRthg81VgTAN1IZD";
        this.register = function (data) {
            var params = new http_1.URLSearchParams();
            _(data).each(function (val, key) {
                params.set(key, val);
            });
            return Rx_1.Observable.of({
                id: 1,
                username: data.username
            });
        };
        this.login = function (data) {
            return Rx_1.Observable.of({
                username: data.username,
                id: 1
            });
        };
        this.favoriteEvent = function (eventId) {
            var params = new http_1.URLSearchParams();
            params.set("username", _this._store.userSubj.value.username);
            params.set("eventId", eventId);
            return _this._http.get('/db/addFavorite', { search: params });
        };
        this.fetchEvents = function (data) {
            _(data).defaults({
                sort: 'time',
                access_token: _this.token
            });
            var params = new http_1.URLSearchParams();
            _(data).each(function (val, key) {
                params.set(key, val);
            });
            return _this._http.get('/events', { search: params });
        };
        this.fetchAllEvents = function () {
            var data = {
                sort: 'time',
                access_token: _this.token,
                distance: 200000,
                lat: 41.99,
                lng: 21.43
            };
            var params = new http_1.URLSearchParams();
            _(data).each(function (val, key) {
                params.set(key, val);
            });
            return _this._http.get('/events', { search: params }).flatMap(function (val) { return Rx_1.Observable.of(JSON.parse(val._body).events); });
        };
    }
    Api.prototype.getFavoriteEventsForUser = function () {
        var params = new http_1.URLSearchParams();
        params.set("userId", this._store.userSubj.value.id);
        return this._http.get('/db/getUserFavorites', { search: params });
    };
    Api = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [http_1.Http, store_1.StoreService])
    ], Api);
    return Api;
}());
exports.Api = ApiService;
//# sourceMappingURL=api.service.js.map
