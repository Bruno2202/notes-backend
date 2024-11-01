import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
const { FB_API_KEY, FB_AUTH_DOMAIN, FB_PROJECT_ID, FB_STORAGE_BUCKET, FB_MESSAGING_SENDER_ID, FB_APP_ID, } = process.env;
const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID
};
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export { app, storage };
