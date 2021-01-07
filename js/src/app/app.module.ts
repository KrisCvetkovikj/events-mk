import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SearchEventsComponent} from "./components/search-events/search-events.component";
import {HeaderComponent} from "./components/header/header.component";
import {CurtainComponent} from "./components/curtain/curtain.component";
import {EventCardBigComponent} from "./components/event-card-big/event-card-big.component";
import {EventCardImageComponent} from "./components/event-card-image/event-card-image.component";
import {EventCardTextComponent} from "./components/event-card-text/event-card-text.component";
import {EventDetailsModalComponent} from "./components/event-details-modal/event-details-modal.component";
import {SafePipe} from "./pipes/safe.pipe";
import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent},
    ])
  ],
  declarations: [
    AppComponent,
    SearchEventsComponent,
    HeaderComponent,
    CurtainComponent,
    EventCardBigComponent,
    EventCardImageComponent,
    EventCardTextComponent,
    EventDetailsModalComponent,
    SafePipe,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ]
})
export class AppModule {
}
