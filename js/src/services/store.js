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
var Rx_1 = require("rxjs/Rx");
var _ = require("underscore");
var Store = (function () {
    function Store() {
        var _this = this;
        this.eventsSubj = new Rx_1.BehaviorSubject(null);
        this.userSubj = new Rx_1.BehaviorSubject(null);
        this.userId$ = new Rx_1.Subject(null);
        this.favoriteEventsSubj = new Rx_1.BehaviorSubject(null);
        this.setEvents = function (events) { return _this.eventsSubj.next(events); };
        this.setUser = function (user) { return _this.userSubj.next(user); };
        this.setFavoriteEvents = function (events) { return _this.favoriteEventsSubj.next(events); };
        this.addFavoriteEvent = function (event) { return _this.favoriteEventsSubj.next(_this.favoriteEventsSubj.value.push(event)); };
        this.removeFavoriteEvent = function (event) { return _this.eventsSubj.next(_(_this.favoriteEventsSubj.value).without(event)); };
        this.userId$ = this.userSubj.map(function (user) { return user.id; }).distinctUntilChanged();
    }
    Store = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Store);
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.js.map