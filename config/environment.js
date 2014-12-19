/* jshint node: true */

var os     = require('os');
var ifaces = os.networkInterfaces();

var addresses = [];
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details){
    if(details.family === 'IPv4' && details.address !== '127.0.0.1') {
      addresses.push(details.address);
    }
  });
}

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'freshmate',
    podModulePrefix: 'freshmate/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        'ember-htmlbars': true,
        'ember-routing-named-substates': true,
        'composable-computed-properties': true,
        'ember-routing-will-change-hooks': true,
        'ember-metal-is-present': true,
        'property-brace-expansion-improvement': true,
        'ember-routing-multi-current-when': true,
        'ember-runtime-item-controller-inline-class': true,
        'ember-routing-fire-activate-deactivate-events': true,
        'ember-testing-pause-test': true,
        'ember-htmlbars-component-generation': true,
        'ember-htmlbars-inline-if-helper': true,
        'ember-htmlbars-attribute-syntax': true,
        'ember-metal-injected-properties': true,
        'ember-htmlbars-block-params': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'style-src' : "'self' 'unsafe-inline'",
      'font-src': "'self' https://fonts.gstatic.com/s/robotodraft/v2/ https://fonts.gstatic.com/s/robotodraft/v1/",
      'img-src': "'self' http://www.fillmurray.com/200/200 http://www.gravatar.com/avatar/"
    },


    cordova: {
      rebuildOnChange: false,
      emulate: false,
      emberUrl: 'http://' + addresses[0] + ':4200',
      liveReload: {
        enabled: false,
        platform: 'ios'
      }
    }
  };

  ENV.GOOGLE_APP_ID = "187238474080-5onaooathckn0upobhsfo0k6g5qc0arj.apps.googleusercontent.com"

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.apiUrl   = 'http://' + addresses[0] + ':3000/api/v1';
    ENV.development = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.apiUrl = 'http://freshmate-staging.herokuapp.com/api/v1';
    ENV.staging = true;
  }


  if (environment === 'production') {
    ENV.apiUrl = 'http://freshmate.herokuapp.com/api/v1';
    ENV.production = true;
  }

  return ENV;
};
