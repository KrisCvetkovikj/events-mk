import {Component, Input, ViewChild} from "@angular/core";
import {BehaviorSubject, of, Subject} from "rxjs";
import {ApiService} from "../../services/api.service";
import {StoreService} from "../../services/store.service";
import {BsModalComponent} from "ng2-bs3-modal";
import {first, flatMap} from "rxjs/internal/operators";

@Component({
  selector: 'evmk-header',
  templateUrl: 'js/src/app/components/header/header.component.html',
})
export class HeaderComponent {
  @ViewChild('modal')
  modal: BsModalComponent;
  @Input() openLoginModal$;
  @Input() isAuth: boolean;
  @Input() displayName: string;

  activeLoginViewSubj: Subject<string> = new BehaviorSubject<string>('login');
  registerData = {
    username: null,
    password: null
  };
  loginData = {
    username: null,
    password: null
  };

  constructor(private _api: ApiService, private _store: StoreService) {
    this._store.userSubj.asObservable().subscribe(val => console.log(val));
  }

  register() {
    this._api.register(this.registerData)
      .pipe(first())
      .subscribe((data) => {
      console.log(data);
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
      .pipe(
        flatMap(user => {
          this._store.setUser(user);

          return of(user);
        }),
        first()
      )
      .subscribe(data => {
        this.modal.close();
      });
  }

  logout() {
    this._store.setUser(null);
  }

  fetchFavoriteEvents = () => {
    return this._api.getFavoriteEventsForUser()
      .pipe(
        flatMap((val: { _body }) => of(JSON.parse(val._body))),
        first()
      );
  }
}
