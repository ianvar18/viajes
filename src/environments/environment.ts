import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBlMq0oh1vjxsK9umDfeqtThAa6sS0zSNk",
  authDomain: "vargasyanez-2024.firebaseapp.com",
  projectId: "vargasyanez-2024",
  storageBucket: "vargasyanez-2024.appspot.com",
  messagingSenderId: "486413180619",
  appId: "1:486413180619:web:b9bbbf218d1405b0c5054e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const environment = {
  production: false,
  firebaseConfig
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
