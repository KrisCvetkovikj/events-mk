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
        distance: 6606
    },
    {
        id: "kavadarci",
        text: 'Кавадарци',
        lat: 41.373202,
        lng: 21.960640,
        distance: 9926
    },
    {
        id: "negotino",
        text: 'Неготино',
        lat: 41.482862,
        lng: 22.109642,
        distance: 5442
    },
    {
        id: "berovo",
        text: 'Берово',
        lat: 41.706754,
        lng: 22.852314,
        distance: 1872
    },
    {
        id: "vinica",
        text: 'Виница',
        lat: 41.881416,
        lng: 22.508476,
        distance: 2
    },
    {
        id: "delcevo",
        text: 'Делчево',
        lat: 41.969446,
        lng: 22.775066,
        distance: 1820
    },
    {
        id: "makedonska_kamenica",
        text: 'Македонска Каменица',
        lat: 42.019904,
        lng: 22.587419,
        distance: 1269
    },
    {
        id: "makedonski_brod",
        text: 'Македонски Брод',
        lat: 41.512819,
        lng: 21.216230,
        distance: 1314
    },
    {
        id: "sveti_nikole",
        text: 'Свети Николе',
        lat: 41.863936,
        lng: 21.940556,
        distance: 1895
    },
    {
        id: "kocani",
        text: 'Кочани',
        lat: 41.916649,
        lng: 22.411723,
        distance: 2818
    },
    {
        id: "shtip",
        text: 'Штип',
        lat: 41.744869,
        lng: 22.200193,
        distance: 3376
    },
    {
        id: "probishtip",
        text: 'Пробиштип',
        lat: 41.995860,
        lng: 22.184057,
        distance: 2684
    },
    {
        id: "pehcevo",
        text: 'Пехчево',
        lat: 41.761933,
        lng: 22.886045,
        distance: 1580
    },
    {
        id: "debar",
        text: 'Дебар',
        lat: 41.510120,
        lng: 20.551987,
        distance: 6696
    },
    {
        id: "kicevo",
        text: 'Кичево',
        lat: 41.510602,
        lng: 20.952666,
        distance: 3899
    },
    {
        id: "ohrid",
        text: 'Охрид',
        lat: 41.086856,
        lng: 20.789394,
        distance: 8960
    },
    {
        id: "struga",
        text: 'Струга',
        lat: 41.178654,
        lng: 20.676956,
        distance: 3545
    },
    {
        id: "prilep",
        text: 'Прилеп',
        lat: 41.341505,
        lng: 21.550026,
        distance: 4966
    },
    {
        id: "resen",
        text: 'Ресен',
        lat: 41.088667,
        lng: 21.012554,
        distance: 2302
    },
    {
        id: "tetovo",
        text: 'Тетово',
        lat: 41.980421,
        lng: 21.013756,
        distance: 13
    },
    {
        id: "gostivar",
        text: 'Гостивар',
        lat: 41.792049,
        lng: 20.903721,
        distance: 7821
    },
    {
        id: "kratovo",
        text: 'Кратово',
        lat: 42.078477,
        lng: 22.175689,
        distance: 2403
    },
    {
        id: "kriva_palanka",
        text: 'Крива Паланка',
        lat: 42.201946,
        lng: 22.330141,
        distance: 2581
    },
    {
        id: "kumanovo",
        text: 'Куманово',
        lat: 42.129548,
        lng: 21.721172,
        distance: 7227
    },
    {
        id: "krushevo",
        text: 'Крушево',
        lat: 41.370625,
        lng: 21.246357,
        distance: 1450
    },
    {
        id: "valandovo",
        text: 'Валандово',
        lat: 41.317915,
        lng: 22.561541,
        distance: 1923
    },
    {
        id: "gevgelija",
        text: 'Гевгелија',
        lat: 41.142855,
        lng: 22.497253,
        distance: 2254
    },
    {
        id: "strumica",
        text: 'Струмица',
        lat: 41.437193,
        lng: 22.646341,
        distance: 4
    },
    {
        id: "demir_hisar",
        text: 'Демир Хисар',
        lat: 41.222310,
        lng: 21.202970,
        distance: 1208
    },
    {
        id: "bitola",
        text: 'Битола',
        lat: 41.027571,
        lng: 21.334763,
        distance: 4154
    },
    {
        id: "radovish",
        text: 'Радовиш',
        lat: 41.639116,
        lng: 22.467170,
        distance: 2553
    },
    {
        id: "skopje",
        text: 'Скопје',
        lat: 41.978890,
        lng: 21.455612,
        distance: 18,
        children: [
            {
                id: "centar",
                text: 'Центар',
                lat: 41.994839,
                lng: 21.429498,
                distance: 1637
            },
            {
                id: "aerodrom",
                text: 'Аеродром',
                lat: 41.025501,
                lng: 21.372861,
                distance: 3000
            },
            {
                id: "karposh",
                text: 'Дојран',
                lat: 42.001888,
                lng: 21.398642,
                distance: 1571
            },
            {
                id: "butel",
                text: 'Бутел',
                lat: 42.015504,
                lng: 21.443617,
                distance: 3744
            },
            {
                id: "cair",
                text: 'Чаир',
                lat: 42.014739,
                lng: 21.427202,
                distance: 1590
            },
            {
                id: "ilinden",
                text: 'Илинден',
                lat: 42.006321,
                lng: 21.695938,
                distance: 2357
            },
            {
                id: "chucher_sandevo",
                text: 'Чучер Сандево',
                lat: 42.032656,
                lng: 21.392827,
                distance: 2065
            },
            {
                id: "gazi_baba",
                text: 'Гази Баба',
                lat: 42.022928,
                lng: 21.489349,
                distance: 3657
            },
            {
                id: "gjorche_petrov",
                text: 'Ѓорче Петров',
                lat: 42.009892,
                lng: 21.359353,
                distance: 1841
            },
            {
                id: "petrovec",
                text: 'Петровец',
                lat: 41.962554,
                lng: 21.703234,
                distance: 1889
            },
            {
                id: "kisela_voda",
                text: 'Кисела Вода',
                lat: 41.963830,
                lng: 21.451793,
                distance: 2357
            },
            {
                id: "dracevo",
                text: 'Драчево',
                lat: 41.944585,
                lng: 21.511295,
                distance: 3029
            },
            {
                id: "saraj",
                text: 'Сарај',
                lat: 41.996753,
                lng: 21.322532,
                distance: 1899
            },
            {
                id: "sopishte",
                text: 'Сопиште',
                lat: 41.940850,
                lng: 21.394887,
                distance: 3105
            },
            {
                id: "shuto_orizari",
                text: 'Шуто Оризари',
                lat: 42.038297,
                lng: 21.425958,
                distance: 1215
            },
            {
                id: "zelenikovo",
                text: 'Зелениково',
                lat: 41.879133,
                lng: 21.598433,
                distance: 1811
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