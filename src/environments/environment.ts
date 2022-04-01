// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'ultimo-bote-app',
    appId: '1:832357320209:web:c55d21a6ab9fc82abd53b0',
    storageBucket: 'ultimo-bote-app.appspot.com',
    apiKey: 'AIzaSyDC7D-zKMxXXu7VIcn_9vK3skE3nvmekDE',
    authDomain: 'ultimo-bote-app.firebaseapp.com',
    messagingSenderId: '832357320209',
    measurementId: 'G-86PJZ8189S',
  },
  open_weather_key: 'f7846836535a66fef85badd3f1f27c77',
  weather_url: 'https://api.openweathermap.org/data/2.5',
  latitude: '22.99362028204843',
  longitude: '-82.385912945401',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
