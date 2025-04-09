import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const CreateScreen = () => {
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
    };

    try {
      const existingDecks = await AsyncStorage.getItem('decks');
      const decks = existingDecks ? JSON.parse(existingDecks) : [];

      const updatedDecks = [...decks, newDeck];
      await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));

      router.replace('/'); // zurück zur Startseite
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      Alert.alert('Fehler', 'Deck konnte nicht gespeichert werden.');
    }
  };

  const getRandomColor = () => {
    const colors = ['#f9c2ff', '#c2f9ff', '#ffc2f9', '#c2ffc2'];
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default CreateScreen;

