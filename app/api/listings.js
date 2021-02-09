import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';
import { encode, decode } from 'base-64';
global.atob = decode;
global.btoa = encode;

function snapshotToArray(snapshot) {
  const returnArr = [];

  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};

const getListings = async () => {
  try {
    const snapshot = await firebase.database().ref('listings').once('value');
    const arr = snapshotToArray(snapshot);
    const items = [];
    try {
      await arr.reduce((p, item) => {
        return p.then(_ => new Promise(async (resolve, reject) => {
          try {
            const imageUrl = await firebase
              .storage()
              .ref()
              .child(`listings/${item.key}/image-1.jpg`)
              .getDownloadURL();
            item.images = [imageUrl];
            items.push(item);
            return resolve();
          } catch (error) {
            return reject(error);
          }
        }))
      }, Promise.resolve());
      return { ok: true, data: items };
    } catch (error) {
      return { data: { error } };
    }
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
    images
  } = listing;

  try {
    const listingRef = await firebase.database().ref('listings').push();
    const imageCount = images.length;

    const promises = images.map(async (image, i) => {
      await firebase
        .storage()
        .ref()
        .child(`listings/${listingRef.key}/image-${i + 1}.jpg`)
        .put(image.blob);
      onUploadProgress(((100 / imageCount) * (i + 1)) / 100);
    });

    await Promise.all(promises);

    await listingRef.set({
      title,
      price,
      category,
      description,
      user: user.user_id,
    });
    onUploadProgress(100);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { data: { error } };
  }
};

export default {
  getListings,
  addListing,
};
