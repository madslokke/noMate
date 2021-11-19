import * as React from 'react';
import {Button, FlatList, StyleSheet, TextInput, VirtualizedList} from 'react-native';

import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import {getFriendsService} from "../services/friends.service";

export default function TabTwoScreen() {

  const [name, setName] = useState('');
  const [pushToken, setPushToken] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [friends, setFriends] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getFriendsService().getFriends().then(result => {
      setFriends(result);
    })
    getFriendsService().getSelectedId().then(result => {
      setSelectedId(result);
      console.log(result);
    })
  }, []);

  function removeFriend(id) {
    getFriendsService().removeFriend(id);
    reloadFriends();
  }

  function selectFriend(id) {
    getFriendsService().setSelected(id);
    reloadFriends();
  }

  function Item({item, active}) {
    let style = styles.title;
    if (active) {
      style = styles.active;
    }
    console.log(style);
    return <View style={styles.item}>
      <Text style={style}>
      <span onClick={() => selectFriend(item.id)}>
        {item.name} ({item.pushToken})
      </span>
        <span onClick={() => removeFriend(item.id)}>X</span>
      </Text>
    </View>
  }

  const addFriend = (event) => {
    event?.preventDefault();
    getFriendsService().setFriend(name, pushToken);
    reloadFriends();
  }

  const reloadFriends = () => {
    return getFriendsService().getFriends().then(result => {
      console.log(result);
      setFriends(result);
      setRefresh(true);
      return friends;
    });
  }

  const renderItem = ({item}) => <Item item={item} active={item.id === selectedId}/>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new friends</Text>
      <form onSubmit={(event) => addFriend(event)}>
        <div>
          <TextInput placeholder="Navn" onChangeText={text => setName(text)}/>
        </div>
        <div>
          <TextInput placeholder="Push token" onChangeText={text => setPushToken(text)}/>
        </div>
        <Button title="Tilføj" onPress={() => addFriend(null)}/>
      </form>
      <VirtualizedList refreshing={refresh} data={friends} renderItem={renderItem}
                       keyExtractor={(item, index) => item.name} getItem={(data, index) => data[index]}
                       getItemCount={() => friends.length ?? 1} onRefresh={() => setRefresh(false)}/>
      <Button onPress={() => reloadFriends()} title="Genindlæs"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  active: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: "underline"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#b0b0b0"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
