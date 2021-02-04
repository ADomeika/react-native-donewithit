import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';

import useAuth from '../auth/useAuth';

const getListings = async () => {
  try {
    const snapshot = await firebase.database().ref('listings').once('value');
    console.log(snapshot.val());
    return { ok: true, data: snapshot.val() };
  } catch (error) {
    return { data: { error } };
  }
};

// const addListing = async (listing, onUploadProgress) => {
//   const { user } = useAuth();
//   const {
//     title,
//     price,
//     category: { value: category },
//     description,
//     images
//   } = listing;

//   try {
//     const result = await firebase.database(`listings/${user.uid}/`).ref('listings').set({
//       title,
//       price,
//       category,
//       description
//     });
//   } catch (error) {
    
//   }
// };


import client from './client';

const endpoint = '/listings';

// const getListings = () => client.get(endpoint);

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append('title', listing.title);
  data.append('price', listing.price);
  data.append('categoryId', listing.category.value);
  data.append('description', listing.description);
  listing.images.forEach((image, index) =>
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    })
  );

  if (listing.location) {
    data.append('location', JSON.stringify(listing.location));
  }

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getListings,
  addListing,
};
