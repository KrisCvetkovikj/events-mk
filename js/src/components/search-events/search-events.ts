import {Component, Output} from "@angular/core";
import {SELECT_DIRECTIVES} from "ng2-select/ng2-select";
import {Subject} from "rxjs/Rx";
import * as _ from "underscore";

@Component({
  selector: 'search-events',
  templateUrl: 'js/src/components/search-events/search-events.html',
  directives: [
    SELECT_DIRECTIVES
  ]
})
export class SearchEvents {
  location      : any = null;
  municipalities: any = [];
  municipality  : any = null;
  sort          : ISearchEventSort = null;
  locationItems : Array<ISearchEventLocationItem> = LOCATION_ITEMS;
  sortItems     : Array<ISearchEventSort> = SORT_ITEMS;
  fromDateTime  : any;
  toDateTime    : any;

  initialLocation = {
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
  initialMunicipality = {
    id: "centar",
    text: "Центар",
    lat: 41.994839,
    lng: 21.429498,
    distance: 1637
  };
  initialSort = {
    id: 'time',
    text: 'Време'
  };

  @Output() triggerSearchEvents: Subject = new Subject();

  selectedLocation(val) {
    this.location = this.getCityData(val.id);
    if(this.location.children) {
      this.municipalities = this.location.children;
    } else {
      this.municipalities = [];
      this.municipality = null;
    }

  }
  selectedMunicipality(val) {
    this.municipality = this.getMunicipalityData(this.location.id, val.id);
  }
  selectedSort(val) {
    this.sort = val;
  }

  searchRandom() {
    let _locationObj = LOCATION_ITEMS[Math.floor(Math.random()*LOCATION_ITEMS.length)];

    this.triggerSearchEvents.next({
      location: _locationObj,
      fromDate: this.fromDateTime,
      toDate: this.toDateTime,
      sort: this.sort && this.sort.id
    });
  }

  search() {
    // console.log(`
    //   fromDateTime : ${this.fromDateTime},
    //   toDateTime   : ${this.toDateTime}
    // `);
    // console.log('location: ', this.location);
    // console.log('sort: ', this.sort);

    if(!this.location) {
      return;
    }

    let _locationObj = (
      this.municipality ?
      this.municipality :
      this.location
    );

    this.triggerSearchEvents.next({
      location: _locationObj,
      fromDate: this.fromDateTime,
      toDate: this.toDateTime,
      sort: this.sort && this.sort.id
    });
  }

  getCityData(cityId) {
    return _(LOCATION_ITEMS).findWhere({id: cityId});
  }
  getMunicipalityData(cityId, municipalityId) {
    return _(this.municipalities).findWhere({id: municipalityId});
  }
}

export interface ISearchEventSort {
  id: string,
  text: string
}

export interface ISearchEventLocationItem {
  id: string,
  text: string,
  lat: number,
  lng: number,
  distance: number,
  children?: any
}

const SORT_ITEMS = [
  {
    id: 'popularity',
    text: 'Популарност'
  },
  {
    id: 'time',
    text: 'Време'
  }
];

const LOCATION_ITEMS = [
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


const MUNICIPALITIES = {
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

