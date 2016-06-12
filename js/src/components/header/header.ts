import {Component, ViewChild, Input} from "@angular/core";
import {Subject, BehaviorSubject, Observable} from "rxjs/Rx";
import {Api} from "../../services/api";
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {Store} from "../../services/store";
import * as _ from "underscore";

@Component({
  selector: 'evmk-header',
  templateUrl: 'js/src/components/header/header.html',
  directives: [
    MODAL_DIRECTIVES
  ]
})
export class Header {
  @ViewChild('modal')
  modal: ModalComponent;
  @Input() openLoginModal$;
  @Input() isAuth: boolean;
  @Input() displayName: string;

  activeLoginViewSubj:Subject<string> = new BehaviorSubject('login');
  registerData = {
    username: null,
    password: null
  };
  loginData = {
    username: null,
    password: null
  };

  constructor(private _api:Api, private _store:Store) {
    this._store.userSubj.asObservable().subscribe(val => console.log(val));
  }

  register() {
    this._api.register(this.registerData)
      // .flatMap((val:{_body}) => Observable.of(JSON.parse(val._body)))
      // .do(this.fetchFavoriteEvents)
      // .do(val => {
      //   debugger;
      //   this._store.setFavoriteEvents(val);
      // })
      .first()
      .subscribe((data) => {
      console.log(data);
      // let user = _(data).findWhere({username: this.registerData.username});
      // this._store.setUser(user);
        this._store.setUser(data);
      this.modal.close();
    });
  }

  ngOnInit() {
    this.openLoginModal$.subscribe(() => {
      this.modal.open();
    });
  }

  login() {
    this._api.login(this.loginData)
      // .flatMap((val:{_body}) => Observable.of(JSON.parse(val._body)))
      .flatMap(user => {
        // let user = _(users).findWhere({username: this.loginData.username});
        this._store.setUser(user);

        return Observable.of(user);
        // return this.fetchFavoriteEvents().do(events => {
        //   this._store.setFavoriteEvents(events);
        // });
      })
      .first()
      .subscribe(data => {
        this.modal.close();
      });
  }

  fetchFavoriteEvents = () => {
    return this._api.getFavoriteEventsForUser()
      .flatMap((val:{_body}) => Observable.of(JSON.parse(val._body)))
      .first();
  }
}

