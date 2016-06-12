"use strict";
var http_1 = require("@angular/http");
var _ = require("underscore");
function getGuid() {
    return Math.random().toString().slice(2);
}
exports.getGuid = getGuid;
exports.identity = function (val) { return val; };
function toUrlSearchParams(params) {
    return _(params).reduce(function (searchParams, val, key) {
        if (_.isArray(val)) {
            _(val).each(function (theVal) { return searchParams.append(key, theVal); });
        }
        else {
            searchParams.append(key, val);
        }
        return searchParams;
    }, new http_1.URLSearchParams());
}
exports.toUrlSearchParams = toUrlSearchParams;
exports.monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
//# sourceMappingURL=util.js.map