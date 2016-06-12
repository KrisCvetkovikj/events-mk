import {HTTP_PROVIDERS} from "@angular/http";
import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {provide} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";

import {App} from "js/src/app";
import {Api} from "js/src/services/api";
import {SafePipe} from "js/src/pipes/safe";
import {Events} from "js/src/services/events";
import {Store} from "./src/services/store";
import {Persistence} from "./src/services/p";


bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  Api,
  provide(LocationStrategy, {useClass: PathLocationStrategy}),


  // services
  Events,
  Store,

  // Pipes
  SafePipe
]);
