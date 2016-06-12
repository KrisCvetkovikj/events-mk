import {URLSearchParams} from "@angular/http";
import * as _ from "underscore";

export function getGuid() {
  return Math.random().toString().slice(2);
}

export const identity = val => val;

export function toUrlSearchParams(params: any): URLSearchParams {
  return _(params).reduce((searchParams, val, key) => {
    if (_.isArray(val)) {
      _(val).each(theVal => searchParams.append(key, theVal));
    } else {
      searchParams.append(key, val);
    }
    return searchParams;
  }, new URLSearchParams());
}

export var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
