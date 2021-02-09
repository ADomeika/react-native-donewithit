import * as firebase from 'firebase';
import 'firebase/database';

const subscribe = () => {
  firebase.database().ref('listings').on('child_added', (snapshot) => {
    console.log(snapshot);
  })
};

export default { subscribe };
