import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function CreateScreen() {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handlePress = async () => {
    const trimmedTitle = inputText.trim();

    if (trimmedTitle.length === 0) {
      Alert.alert('Fehler', 'Der Deckname darf nicht leer sein.');
      return;
    }

    const newDeck = {
      id: Date.now().toString(),
      title: trimmedTitle,
      color: getRandomColor(),
      cards: [], // neu hinzugefügt
    };

    try {
      const existingDecks = await AsyncStorage.getItem('decks');
      const decks = existingDecks ? JSON.parse(existingDecks) : [];
      const updatedDecks = [...decks, newDeck];
      await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
      router.replace('./'); // geht zurück zum Index
    } catch (error) {
      Alert.alert('Fehler', 'Beim Speichern ist etwas schiefgelaufen.');
      console.error(error);
    }
  };

  const getRandomColor = () => {
    const colors = ['#FF8A80', '#80D8FF', '#A7FFEB', '#FFD180', '#CFD8DC'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deckname:</Text>

      <TextInput
        style={styles.input}
        placeholder="Dein Deckname hier..."

        value={inputText}
        onChangeText={setInputText}

      />
      <Button title="Erstellen" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#9effd5',
    
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
});
