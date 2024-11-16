"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.app = void 0;
require("dotenv/config");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const { FB_API_KEY, FB_AUTH_DOMAIN, FB_PROJECT_ID, FB_STORAGE_BUCKET, FB_MESSAGING_SENDER_ID, FB_APP_ID, } = process.env;
const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const storage = (0, storage_1.getStorage)();
exports.storage = storage;
