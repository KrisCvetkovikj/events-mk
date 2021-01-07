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
var Rx_1 = require("rxjs/Rx");
var api_1 = require("../../services/api.service");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var store_1 = require("../../services/store.service");
var HeaderComponent = (function () {
    function Header(_api, _store) {
        var _this = this;
        this._api = _api;
        this._store = _store;
        this.activeLoginViewSubj = new Rx_1.BehaviorSubject('login');
        this.registerData = {
            username: null,
            password: null
        };
        this.loginData = {
            username: null,
            password: null
        };
        this.fetchFavoriteEvents = function () {
            return _this._api.getFavoriteEventsForUser()
                .flatMap(function (val) { return Rx_1.Observable.of(JSON.parse(val._body)); })
                .first();
        };
        this._store.userSubj.asObservable().subscribe(function (val) { return console.log(val); });
    }
    Header.prototype.register = function () {
        var _this = this;
        this._api.register(this.registerData)
            .first()
            .subscribe(function (data) {
            console.log(data);
            _this._store.setUser(data);
            _this.modal.close();
        });
    };
    Header.prototype.ngOnInit = function () {
        var _this = this;
        this.openLoginModal$.subscribe(function () {
            _this.modal.open();
        });
    };
    Header.prototype.login = function () {
        var _this = this;
        this._api.login(this.loginData)
            .flatMap(function (user) {
            _this._store.setUser(user);
            return Rx_1.Observable.of(user);
        })
            .first()
            .subscribe(function (data) {
            _this.modal.close();
        });
    };
    Header.prototype.logout = function () {
        this._store.setUser(null);
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], Header.prototype, "modal", void 0);
    __decorate([
        core_1.Input(),
        __metadata('design:type', Object)
    ], Header.prototype, "openLoginModal$", void 0);
    __decorate([
        core_1.Input(),
        __metadata('design:type', Boolean)
    ], Header.prototype, "isAuth", void 0);
    __decorate([
        core_1.Input(),
        __metadata('design:type', String)
    ], Header.prototype, "displayName", void 0);
    Header = __decorate([
        core_1.Component({
            selector: 'evmk-header',
            templateUrl: 'header.component.html',
            directives: [
                ng2_bs3_modal_1.MODAL_DIRECTIVES
            ]
        }),
        __metadata('design:paramtypes', [api_1.ApiService, store_1.StoreService])
    ], Header);
    return Header;
}());
exports.Header = HeaderComponent;
//# sourceMappingURL=header.component.js.map
