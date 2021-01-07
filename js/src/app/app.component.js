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
var header_1 = require("./components/header/header.component");
var search_events_1 = require("./components/search-events/search-events.component");
var Rx_1 = require("rxjs/Rx");
var event_card_big_1 = require("./components/event-card-big/event-card-big.component");
var event_card_image_1 = require("./components/event-card-image/event-card-image.component");
var event_card_text_1 = require("./components/event-card-text/event-card-text.component");
var curtain_1 = require("./components/curtain/curtain.component");
var util_1 = require("./services/util.service");
var _ = require("underscore");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var event_details_modal_1 = require("./components/event-details-modal/event-details-modal.component");
var api_1 = require("./services/api.service");
var store_1 = require("./services/store.service");
var App = (function () {
    function App(_api, _store, viewContainerRef) {
        var _this = this;
        this._api = _api;
        this._store = _store;
        this.fetchEventsTriggers = new Rx_1.Subject();
        this.fetchingEventsSubj = new Rx_1.BehaviorSubject(false);
        this.eventsFilterSubj = new Rx_1.BehaviorSubject('all');
        this.selectedEventSubj = new Rx_1.Subject();
        this.toggleFavEventTrigger = new Rx_1.Subject();
        this.entryCardTypeSubj = new Rx_1.BehaviorSubject('big');
        this.openLoginModalSubj = new Rx_1.Subject();
        this._fetchEvents = function (data) {
            _this.fetchingEventsSubj.next(true);
            var location = data.location, sort = data.sort, fromDate = data.fromDate, toDate = data.toDate;
            var params = {
                lat: location.lat,
                lng: location.lng,
                distance: location.distance,
                sort: sort || 'time'
            };
            var fromDateTimeFilter = fromDate ? new Date(fromDate) : null;
            var toDateTimeFilter = toDate ? new Date(toDate) : null;
            _this._api.fetchEvents(params)
                .flatMap(function (val) { return Rx_1.Observable.of(JSON.parse(val._body).events); })
                .first()
                .finally(function () { return _this.fetchingEventsSubj.next(false); })
                .map(function (events) {
                var res = [];
                if (fromDateTimeFilter || toDateTimeFilter) {
                    res = _(events).filter(function (event) {
                        var eventFromDateTime = new Date(event.eventStarttime);
                        return (fromDateTimeFilter <= eventFromDateTime &&
                            toDateTimeFilter >= eventFromDateTime);
                    });
                }
                else {
                    res = events;
                }
                return res.map(function (event) {
                    if (event.eventDescription) {
                        event.shortDescription = event.eventDescription.substring(0, 100) + '...';
                    }
                    if (event.eventStats) {
                        event.eventStats.totalCount = event.eventStats.attendingCount + event.eventStats.declinedCount + event.eventStats.maybeCount + event.eventStats.noreplyCount;
                    }
                    if (event.eventStarttime) {
                        event.eventStartTime = new Date(event.eventStarttime);
                    }
                    return event;
                });
            }).subscribe(function (events) { return _this._store.setSearchResultEvents(events); });
            _this._api.login({ username: 'test' }).subscribe();
        };
        this.close = function () {
            _this.modal.close();
        };
        this.open = function (event) {
            _this.selectedEventSubj.next(event);
            _this.modal.open();
        };
        this.viewContainerRef = viewContainerRef;
        this.isBusy$ = this.fetchingEventsSubj.asObservable().distinctUntilChanged();
        this.entryCardType$ = this.entryCardTypeSubj.asObservable().distinctUntilChanged();
        this.isAuth$ = this._store.userId$.map(function (val) { return !!val; });
        this.displayName$ = this._store.userSubj.filter(util_1.identity).map(function (val) { return val.username; });
        this.displayEvents$ = Rx_1.Observable.combineLatest(this._store.searchResultEventsSubj.asObservable().distinctUntilChanged(), this.eventsFilterSubj.asObservable().distinctUntilChanged(), this.toggleFavEventTrigger.startWith(null), function (events, filter, toggleFavEvent) { return { events: events, filter: filter, toggleFavEvent: toggleFavEvent }; }).map(function (data) {
            var events = data.events, filter = data.filter, toggleFavEvent = data.toggleFavEvent;
            if (filter == 'all') {
                return events;
            }
            else if (filter == 'favorite') {
                return _(events).filter(function (event) { return event.isFavoritedByCurrentUser; });
            }
        }).distinctUntilChanged();
        this.toggleFavEventTrigger.withLatestFrom(this.isAuth$)
            .subscribe(function (data) {
            var event = data[0];
            var isAuth = data[1];
            if (isAuth) {
                _this.toggleFavoriteEvent(event);
            }
            else {
                _this.openLoginModalSubj.next(true);
            }
        });
        this.fetchEventsTriggers.distinctUntilChanged().subscribe(this._fetchEvents);
    }
    App.prototype.toggleFavoriteEvent = function (event) {
        this._store.toggleFavoriteEvent(event);
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], App.prototype, "modal", void 0);
    App = __decorate([
        core_1.Component({
            selector: 'ng2-app',
            templateUrl: 'app.component.html',
            directives: [
                header_1.HeaderComponent,
                search_events_1.SearchEventsComponent,
                event_card_big_1.EventCardBigComponent,
                event_card_image_1.EventCardImageComponent,
                event_card_text_1.EventCardTextComponent,
                curtain_1.CurtainComponent,
                ng2_bs3_modal_1.MODAL_DIRECTIVES,
                event_details_modal_1.EventDetailsModalComponent
            ]
        }),
        __metadata('design:paramtypes', [api_1.ApiService, store_1.StoreService, core_1.ViewContainerRef])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.component.js.map
