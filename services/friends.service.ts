import AsyncStorage from '@react-native-async-storage/async-storage';
export class FriendsService {

  friends = [];

  async getFriends() {
    if (this.friends.length <= 0) {
      this.friends = JSON.parse(await AsyncStorage.getItem('friends')) ?? [];
    }
    return this.friends;
  }

  setFriend(name, pushToken) {
    if (this.friends?.find(friend => friend.name === name)) {
      return "Already exist";
    }
    this.friends.push({name, pushToken});
    AsyncStorage.setItem('friends', JSON.stringify(this.friends));
    console.log(this.friends, JSON.stringify(this.friends));
  }

  removeFriend(name) {
    const removeIndex = this.friends.findIndex(friend => friend.name === name);
    this.friends.splice(removeIndex, 1);
    AsyncStorage.setItem('friends', JSON.stringify(this.friends));
    console.log(this.friends);
  }

  getSelected() {
    return AsyncStorage.getItem('selectedFriend');
  }

  setSelected(name) {
    AsyncStorage.setItem('selectedFriend', name);
  }

}
const service = new FriendsService();
export function getFriendsService() {
  return service;
}
