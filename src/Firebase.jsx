import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC5C15gtCywmQhs8lVApq6cd-Dw_l_BHnA",
    authDomain: "myapp-50a08.firebaseapp.com",
    projectId: "myapp-50a08",
    storageBucket: "myapp-50a08.firebasestorage.app",
    messagingSenderId: "673922751623",
    appId: "1:673922751623:web:26f5d570064e8b2d456c22",
    measurementId: "G-FBQ37BXQFS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
