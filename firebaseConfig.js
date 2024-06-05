import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGqNuN75Iiy5kE6TQKAhDL5qT8KL8Eovg",
  authDomain: "itboomi-website.firebaseapp.com",
  projectId: "itboomi-website",
  storageBucket: "itboomi-website.appspot.com",
  messagingSenderId: "860710655211",
  appId: "1:860710655211:web:4eaa92bd15748d6c039aae",
  measurementId: "G-RPQVK0WVNJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
