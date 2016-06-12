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
var EventCardBig = (function () {
    function EventCardBig() {
        this.openDetails = new Rx_1.Subject();
        this.toggleFavoriteEvent = new Rx_1.Subject();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventCardBig.prototype, "event", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Rx_1.Subject)
    ], EventCardBig.prototype, "openDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Rx_1.Subject)
    ], EventCardBig.prototype, "toggleFavoriteEvent", void 0);
    EventCardBig = __decorate([
        core_1.Component({
            selector: 'event-card-big',
            templateUrl: 'js/src/components/event-card-big/event-card-big.html',
            host: {
                '[class.big-image-column]': 'true',
                '[class.column]': 'true',
                '[class.col-md-4]': 'true'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], EventCardBig);
    return EventCardBig;
}());
exports.EventCardBig = EventCardBig;
//# sourceMappingURL=event-card-big.js.map