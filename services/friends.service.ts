import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import {db} from "../firebase";

export class FriendsService {

  friends = [];

  async getFriends() {
    this.friends = [];
    const querySnapshot = await getDocs(collection(db, "friends"));
    querySnapshot.forEach((doc) => {
      this.friends.push({...doc.data(), id: doc.id});
    });
    console.log(this.friends);
    return this.friends;
  }

  async setFriend(name, pushToken) {
    if (this.friends?.find(friend => friend.name === name)) {
      return "Already exist";
    }

    try {
      const docRef = await addDoc(collection(db, "friends"), {
        name,
        pushToken,
        selected: false
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async removeFriend(id) {
    await deleteDoc(doc(db, "friends/" + id));
  }

  async getSelectedId() {
    const querySnapshot = await getDocs(collection(db, "friends"));
    let result;
    querySnapshot.forEach((doc) => {
      console.log(doc.data(), doc.data().selected);
      if (doc.data().selected) {
        result = doc.id;
      }
    });
    return result;
  }

  async setSelected(id) {
    try {
      for (const friend of this.friends) {
        if (friend.id === id) {
          await updateDoc(doc(db, "friends/" + id), {
            selected: true
          });
          continue;
        }
        await updateDoc(doc(db, "friends/" + friend.id), {
          selected: false
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}

const service = new FriendsService();

export function getFriendsService() {
  return service;
}
