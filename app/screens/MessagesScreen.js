import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

export default function MessagesScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'Title 1, with a lorem ipsum, whats up everybody, hows it going',
      description:
        'Description 1, lorem ipsum dolor sit amet bla bla bla bla suppp',
      image: require('../assets/jacket.jpg'),
    },
    {
      id: 2,
      title: 'Title 2',
      description: 'Description 2',
      image: require('../assets/jacket.jpg'),
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log(item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: 'Title 2',
              description: 'Description 2',
              image: require('../assets/jacket.jpg'),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
