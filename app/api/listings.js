import {
    collection,
    doc,
    getDocs,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { encode, decode } from "base-64";
import { app } from "./firebaseApp";
global.atob = decode;
global.btoa = encode;

const uploadImageAsync = async (uri, listingId, i) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), `listings/${listingId}/image-${i}.jpg`);

    await uploadBytes(fileRef, blob);

    blob.close();
};

const getListings = async () => {
    try {
        const db = getFirestore(app);
        const docSnap = await getDocs(collection(db, "listings"));
        const items = [];

        docSnap.forEach((doc) => {
            const item = doc.data();
            item.key = doc.id;
            item.images = [item.thumbnail];
            items.push(item);
        });

        // const data = [];
        // await items.reduce((p, item) => {
        //     return p.then(
        //         (_) =>
        //             new Promise(async (resolve, reject) => {
        //                 try {
        //                     const url = await getDownloadURL(
        //                         ref(
        //                             getStorage(),
        //                             `listings/${item.key}/image-1.jpg`
        //                         )
        //                     );
        //                     item.images = [url];
        //                     data.push(item);
        //                     return resolve();
        //                 } catch (error) {
        //                     return reject(error);
        //                 }
        //             })
        //     );
        // }, Promise.resolve());

        return { ok: true, data: items };
    } catch (error) {
        console.log(error);
        return { data: { error } };
    }
};

const addListing = async (user, listing, onUploadProgress) => {
    const {
        title,
        price,
        category: { value: category },
        description,
        images,
    } = listing;

    try {
        const db = getFirestore(app);
        const docRef = doc(collection(db, "listings"));

        // uploadImageAsync(images[0], docRef.id, 1);

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", images[0], true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), `listings/${docRef.id}/image-1.jpg`);

        await uploadBytes(fileRef, blob);

        blob.close();

        const imageUrl = await getDownloadURL(fileRef);

        await setDoc(docRef, {
            title,
            price,
            category,
            description,
            user: user.user_id,
            thumbnail: imageUrl,
        });

        onUploadProgress(100);
        return { ok: true };
    } catch (error) {
        return { data: { error } };
    }
};

export default {
    getListings,
    addListing,
};
