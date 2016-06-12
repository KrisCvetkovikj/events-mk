"use strict";
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var router_deprecated_1 = require("@angular/router-deprecated");
var app_1 = require("js/src/app");
var api_1 = require("js/src/services/api");
var safe_1 = require("js/src/pipes/safe");
var events_1 = require("js/src/services/events");
var store_1 = require("./src/services/store");
platform_browser_dynamic_1.bootstrap(app_1.App, [
    http_1.HTTP_PROVIDERS,
    router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' }),
    api_1.Api,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy }),
    events_1.Events,
    store_1.Store,
    safe_1.SafePipe
]);
//# sourceMappingURL=boot.js.map