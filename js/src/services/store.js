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
        this.userSubj = new Rx_1.BehaviorSubject(null);
        this.userId$ = new Rx_1.Subject(null);
        this.allEventsSubj = new Rx_1.BehaviorSubject(null);
        this.searchResultEventsSubj = new Rx_1.BehaviorSubject([]);
        this.toggleFavoriteEventSubj = new Rx_1.Subject();
        this.setUser = function (user) { return _this.userSubj.next(user); };
        this.setAllEvents = function (events) { return _this.allEventsSubj.next(events); };
        this.setSearchResultEvents = function (events) { return _this.searchResultEventsSubj.next(events); };
        this.toggleFavoriteEvent = function (event) {
            event.isFavoritedByCurrentUser = !event.isFavoritedByCurrentUser;
        };
        this.userId$ = this.userSubj.map(function (user) {
            if (user) {
                return user.id;
            }
            else {
                return null;
            }
        }).distinctUntilChanged();
        this.userSubj.filter(function (val) { return !val; }).subscribe(function () {
            var events = _(_this.searchResultEventsSubj.value).map(function (event) {
                event.isFavoritedByCurrentUser = false;
                return event;
            });
            _this.searchResultEventsSubj.next(events);
        });
        this.favoriteEvents$ = this.searchResultEventsSubj.filter(event.isFavoritedByCurrentUser).distinctUntilChanged();
    }
    Store = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Store);
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.js.map