import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGqNuN75Iiy5kE6TQKAhDL5qT8KL8Eovg",
  authDomain: "itboomi-website.firebaseapp.com",
  projectId: "itboomi-website",
  storageBucket: "itboomi-website.appspot.com",
  messagingSenderId: "860710655211",
  appId: "1:860710655211:web:4eaa92bd15748d6c039aae",
  measurementId: "G-RPQVK0WVNJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
