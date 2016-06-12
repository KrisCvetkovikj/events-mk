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
var header_1 = require("./components/header/header");
var search_events_1 = require("./components/search-events/search-events");
var events_1 = require("./services/events");
var Rx_1 = require("rxjs/Rx");
var event_card_big_1 = require("./components/event-card-big/event-card-big");
var event_card_image_1 = require("./components/event-card-image/event-card-image");
var event_card_text_1 = require("./components/event-card-text/event-card-text");
var curtain_1 = require("./components/curtain/curtain");
var _ = require("underscore");
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var event_details_modal_1 = require("./components/event-details-modal/event-details-modal");
var api_1 = require("./services/api");
var App = (function () {
    function App(_events, _api, viewContainerRef) {
        var _this = this;
        this._events = _events;
        this._api = _api;
        this.eventsSubj = new Rx_1.Subject();
        this.fetchEventsTriggers = new Rx_1.Subject();
        this.fetchingEventsSubj = new Rx_1.BehaviorSubject(false);
        this.selectedEventSubj = new Rx_1.Subject();
        this.entryCardTypeSubj = new Rx_1.BehaviorSubject('big');
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
            }).subscribe(function (events) { return _this.eventsSubj.next(events); });
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
        this._api.fetchEvents({ lat: 41.99, lng: 21.43, distance: 1000 }).subscribe();
        this.fetchEventsTriggers.distinctUntilChanged().subscribe(this._fetchEvents);
    }
    App.prototype.favoriteEvent = function (eventId) {
        this._api.favoriteEvent(eventId);
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], App.prototype, "modal", void 0);
    App = __decorate([
        core_1.Component({
            selector: 'ng2-app',
            templateUrl: 'js/src/app.html',
            directives: [
                header_1.Header,
                search_events_1.SearchEvents,
                event_card_big_1.EventCardBig,
                event_card_image_1.EventCardImage,
                event_card_text_1.EventCardText,
                curtain_1.CurtainComponent,
                ng2_bs3_modal_1.MODAL_DIRECTIVES,
                event_details_modal_1.EventDetailsModal
            ]
        }), 
        __metadata('design:paramtypes', [events_1.Events, api_1.Api, core_1.ViewContainerRef])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map