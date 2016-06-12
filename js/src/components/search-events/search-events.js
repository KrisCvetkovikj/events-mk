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
var ng2_select_1 = require("ng2-select/ng2-select");
var Rx_1 = require("rxjs/Rx");
var _ = require("underscore");
var SearchEvents = (function () {
    function SearchEvents() {
        this.location = null;
        this.municipalities = [];
        this.municipality = null;
        this.sort = null;
        this.locationItems = LOCATION_ITEMS;
        this.sortItems = SORT_ITEMS;
        this.initialLocation = {
            id: "skopje",
            text: "Скопје",
            lat: 41.978890,
            lng: 21.455612,
            distance: 1000,
            children: [
                {
                    id: "centar",
                    text: "Центар",
                    lat: 41.994839,
                    lng: 21.429498,
                    distance: 1637
                }
            ]
        };
        this.initialMunicipality = {
            id: "centar",
            text: "Центар",
            lat: 41.994839,
            lng: 21.429498,
            distance: 1637
        };
        this.initialSort = {
            id: 'time',
            text: 'Време'
        };
        this.triggerSearchEvents = new Rx_1.Subject();
    }
    SearchEvents.prototype.selectedLocation = function (val) {
        this.location = this.getCityData(val.id);
        if (this.location.children) {
            this.municipalities = this.location.children;
        }
        else {
            this.municipalities = [];
            this.municipality = null;
        }
    };
    SearchEvents.prototype.selectedMunicipality = function (val) {
        this.municipality = this.getMunicipalityData(this.location.id, val.id);
    };
    SearchEvents.prototype.selectedSort = function (val) {
        this.sort = val;
    };
    SearchEvents.prototype.searchRandom = function () {
        var _locationObj = LOCATION_ITEMS[Math.floor(Math.random() * LOCATION_ITEMS.length)];
        this.triggerSearchEvents.next({
            location: _locationObj,
            fromDate: this.fromDateTime,
            toDate: this.toDateTime,
            sort: this.sort && this.sort.id
        });
    };
    SearchEvents.prototype.search = function () {
        if (!this.location) {
            return;
        }
        var _locationObj = (this.municipality ?
            this.municipality :
            this.location);
        this.triggerSearchEvents.next({
            location: _locationObj,
            fromDate: this.fromDateTime,
            toDate: this.toDateTime,
            sort: this.sort && this.sort.id
        });
    };
    SearchEvents.prototype.getCityData = function (cityId) {
        return _(LOCATION_ITEMS).findWhere({ id: cityId });
    };
    SearchEvents.prototype.getMunicipalityData = function (cityId, municipalityId) {
        return _(this.municipalities).findWhere({ id: municipalityId });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Rx_1.Subject)
    ], SearchEvents.prototype, "triggerSearchEvents", void 0);
    SearchEvents = __decorate([
        core_1.Component({
            selector: 'search-events',
            templateUrl: 'js/src/components/search-events/search-events.html',
            directives: [
                ng2_select_1.SELECT_DIRECTIVES
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchEvents);
    return SearchEvents;
}());
exports.SearchEvents = SearchEvents;
var SORT_ITEMS = [
    {
        id: 'popularity',
        text: 'Популарност'
    },
    {
        id: 'time',
        text: 'Време'
    }
];
var LOCATION_ITEMS = [
    {
        id: "dojran",
        text: 'Дојран',
        lat: 41.218008,
        lng: 22.703416,
        distance: 1306
    },
    {
        id: "veles",
        text: 'Велес',
        lat: 41.699160,
        lng: 21.769345,
        distance: 6657
    },
    {
        id: "demir_kapija",
        text: 'Демир Капија',
        lat: 41.395870,
        lng: 22.244911,
        distance: 6657
    },
    {
        id: "ohrid",
        text: "Охрид",
        lat: 41.086856,
        lng: 20.789394,
        distance: 8960
    },
    {
        id: "skopje",
        text: "Скопје",
        lat: 41.978890,
        lng: 21.455612,
        distance: 1000,
        children: [
            {
                id: "centar",
                text: "Центар",
                lat: 41.994839,
                lng: 21.429498,
                distance: 1637
            }
        ]
    }
];
var MUNICIPALITIES = {
    "skopje": [
        {
            id: "centar",
            text: "Центар",
            lat: 41.994839,
            lng: 21.429498,
            distance: 1637
        }
    ]
};
//# sourceMappingURL=search-events.js.map