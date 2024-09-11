import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebaseConfig.js";

export class ImageService {
    static base64ToBlob(file: string): Blob {
        const base64Data = file.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const blob = new Blob([buffer], { type: 'image/jpeg' });

        return blob;
    }

    static async uploadImage(blob: Blob, userId: number): Promise<string | null> {
        if (!blob) {
            return null;
        }

        const storageRef = ref(storage, `users/${userId}/userPic`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progressNumber = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progressNumber);
            },
            (error) => {
                console.error('Erro ao fazer o upload:', error);
                throw error;
            }
        )

        try {
            await uploadTask;
            const downloadURL = await getDownloadURL(storageRef);

            if (downloadURL) {
                return downloadURL;
            }

            return null;
        } catch (error: any) {
            console.log(`Erro ao realizar updaload da imagem: ${error.message}`);
            throw new Error("Não foi possível relizar o upload da imagem");
        }
    }
}