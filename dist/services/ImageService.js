"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const storage_1 = require("firebase/storage");
const firebaseConfig_js_1 = require("../config/firebaseConfig.js");
class ImageService {
    static base64ToBlob(file) {
        const base64Data = file.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        return blob;
    }
    static async uploadImage(blob, userId) {
        if (!blob) {
            return null;
        }
        const storageRef = (0, storage_1.ref)(firebaseConfig_js_1.storage, `users/${userId}/userPic`);
        const uploadTask = (0, storage_1.uploadBytesResumable)(storageRef, blob);
        uploadTask.on('state_changed', (snapshot) => {
            const progressNumber = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.error('Erro ao fazer o upload:', error);
            throw error;
        });
        try {
            await uploadTask;
            const downloadURL = await (0, storage_1.getDownloadURL)(storageRef);
            if (downloadURL) {
                return downloadURL;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao realizar updaload da imagem: ${error.message}`);
            throw new Error("Não foi possível relizar o upload da imagem");
        }
    }
}
exports.ImageService = ImageService;
