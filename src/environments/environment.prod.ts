import { initializeApp } from "firebase/app";

// Configuración de Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBlMq0oh1vjxsK9umDfeqtThAa6sS0zSNk",
  authDomain: "vargasyanez-2024.firebaseapp.com",
  projectId: "vargasyanez-2024",
  storageBucket: "vargasyanez-2024.appspot.com",
  messagingSenderId: "486413180619",
  appId: "1:486413180619:web:b9bbbf218d1405b0c5054e"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Configuración del entorno de producción
export const environment = {
  production: true, // Cambia a true
  firebaseConfig,
  apiUrl: "https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/"
};
