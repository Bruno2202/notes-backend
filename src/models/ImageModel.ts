// import * as ImagePicker from 'expo-image-picker';

// export class ImageModel {
//     static async pickImage(): Promise<string | null> {
//         try {
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [1, 1],
//                 quality: 0.7,
//             });

//             if (!result.canceled && result.assets && result.assets.length > 0) {
//                 const uri = result.assets[0].uri;
    
//                 const response = await fetch(uri);
//                 const blob = await response.blob();
//                 const reader = new FileReader();
    
//                 const getBase64FromImage = new Promise<string>((resolve, reject) => {
//                     reader.onloadend = () => {
//                         resolve(reader.result as string);
//                     };
//                     reader.onerror = (error) => {
//                         console.error("Erro ao converter imagem para base64:", error);
//                         reject(error);
//                     };
//                     reader.readAsDataURL(blob);
//                 });
    
//                 const base64Image = await getBase64FromImage;
    
//                 return base64Image;
//             }

//             return null;
//         } catch (error) {
//             console.error("Erro ao selecionar imagem:", error);
//             return null;
//         }
//     };
// }