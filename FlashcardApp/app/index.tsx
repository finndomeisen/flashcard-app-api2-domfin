import React, { useEffect, useState} from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


const DATA = [
  {
    id: '1',
    title: 'First Item',
  },

  {
    id: '2',
    title: 'Second Item',
  },

  {
    id: '3',
    title: 'Third Item',
  },

];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  title: {
    fontSize: 32,
  }, 

});

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
          title="create"
          onPress={() => router.push('/create')}
      />
      <Button
          title="deck 123"
          onPress={() => router.push('/deck/123')}
      />
    </View>
  );
}
