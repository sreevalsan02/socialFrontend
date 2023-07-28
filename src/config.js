import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCZyjCdiZW90rSxdEujDCRAkjm5svS7YHg",
    authDomain: "social-media-c5eae.firebaseapp.com",
    projectId: "social-media-c5eae",
    storageBucket: "social-media-c5eae.appspot.com",
    messagingSenderId: "315569479239",
    appId: "1:315569479239:web:95e299865f471efce2db62",
    measurementId: "G-5RWDNWZREJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage