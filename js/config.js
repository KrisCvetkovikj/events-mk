System.config({
  defaultJSExtensions: true,
  format: 'registerUser',
  paths: {
    'npm:*': 'node_modules/*',
    "masonry-layout": "node_modules/masonry-layout/dist/masonry.pkgd.js"
    //'*': 'node_modules/*'
  },
  map: {
    'app': 'builds/boot',

    '@angular/common': 'npm:@angular/common/index',
    '@angular/compiler': 'npm:@angular/compiler/index',
    '@angular/core': 'npm:@angular/core/index',
    '@angular/http': 'npm:@angular/http/index',
    '@angular/router': 'npm:@angular/router/index',
    '@angular/router-deprecated': 'npm:@angular/router-deprecated/index',
    '@angular/platform-browser': 'npm:@angular/platform-browser/index',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/index',
    '@ngrx/store': 'npm:@ngrx/store/index',
    '@ngrx/core': 'npm:@ngrx/core',
    'rxjs': 'npm:rxjs',

    'angular2-jwt': 'npm:angular2-jwt/angular2-jwt',
    'immutable': 'npm:immutable/dist/immutable',
    'immutable-devtools': 'npm:immutable-devtools/dist/index',
    'underscore': 'npm:underscore/underscore',
    'normalizr': 'npm:normalizr/dist/normalizr.min',
    'jquery': 'npm:jquery/dist/jquery',
    'masonry-layout': 'npm:masonry-layout/masonry',
    'moment': 'npm:moment/moment',
    'ng2-bootstrap': 'npm:ng2-bootstrap',
    'ng2-bs3-modal': 'node_modules/ng2-bs3-modal',
    'parallax': 'npm:parallax/source/parallax',

    // 'masonry-layout' SystemJS bundle errors workaround
    'outlayer': 'npm:outlayer',
    'get-size': 'npm:get-size',
    'ev-emitter': 'npm:ev-emitter',
    'fizzy-ui-utils': 'npm:fizzy-ui-utils',
    'desandro-matches-selector': 'npm:desandro-matches-selector',

    "angular2-masonry": "npm:angular2-masonry",
    "angular2-infinite-scroll": "npm:angular2-infinite-scroll/angular2-infinite-scroll",
    "moment-timezone": "npm:moment-timezone/builds/moment-timezone-with-data.min",
    "@angular/core/src/facade/lang": "node_modules/@angular/core/src/facade/lang",
    "ng2-file-upload": "npm:ng2-file-upload",
    "ng2-select": "npm:ng2-select"
  },
  packages: {
    "angular2-masonry": { "defaultExtension": "js", "main": "index" },
    "ng2-file-upload": {
      "defaultExtension": "js",
      format: 'cjs',
      "main": "ng2-file-upload"
    }
  }
});
