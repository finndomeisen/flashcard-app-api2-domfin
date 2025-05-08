import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles'; // Pfad anpassen, falls nötig
import { router } from 'expo-router';


type Card = {
  question: string;
  answer: string;
};

type Deck = {
  id: string;
  title: string;
  color: string;
  cards?: Card[];
};

export default function DeckDetail() {
  const { id } = useLocalSearchParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');


  useEffect(() => {
    const loadDeck = async () => {
      const storedDecks = await AsyncStorage.getItem('decks');
      if (storedDecks) {
        const decks = JSON.parse(storedDecks);
        const selectedDeck = decks.find((d: Deck) => d.id === id);
        setDeck(selectedDeck ?? null);
      }
    };
    loadDeck();
  }, [id]);

  const saveCard = async () => {
    if (question.trim() === '' || answer.trim() === '') {
      Alert.alert('Fehler', 'Frage und Antwort dürfen nicht leer sein.');
      return;
    }

    const newCard: Card = { question, answer };
    const storedDecks = await AsyncStorage.getItem('decks');
    let updatedDecks: Deck[] = [];

    if (storedDecks) {
      updatedDecks = JSON.parse(storedDecks);
      const deckIndex = updatedDecks.findIndex(d => d.id === id);
      if (deckIndex !== -1) {
        updatedDecks[deckIndex].cards = [...(updatedDecks[deckIndex].cards || []), newCard];
        await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
        setDeck(updatedDecks[deckIndex]);
      }
    }


    setQuestion('');
    setAnswer('');
    setModalVisible(false);
  };
  const openEditModal = (index: number) => {
    if (!deck) return;
    setSelectedCardIndex(index);
    setEditQuestion(deck.cards?.[index].question || '');
    setEditAnswer(deck.cards?.[index].answer || '');
    setEditModalVisible(true);
  };

  const saveEditedCard = async () => {
    if (selectedCardIndex === null || !deck) return;

    const updatedCards = [...(deck.cards || [])];
    updatedCards[selectedCardIndex] = { question: editQuestion, answer: editAnswer };

    const storedDecks = await AsyncStorage.getItem('decks');
    if (storedDecks) {
      const updatedDecks = JSON.parse(storedDecks);
      const deckIndex = updatedDecks.findIndex((d: Deck) => d.id === deck.id);
      if (deckIndex !== -1) {
        updatedDecks[deckIndex].cards = updatedCards;
        await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
        setDeck(updatedDecks[deckIndex]);
      }
    }

    setEditModalVisible(false);
  };

  const deleteCard = async () => {
    if (selectedCardIndex === null || !deck) return;

    const updatedCards = [...(deck.cards || [])];
    updatedCards.splice(selectedCardIndex, 1);

    const storedDecks = await AsyncStorage.getItem('decks');
    if (storedDecks) {
      const updatedDecks = JSON.parse(storedDecks);
      const deckIndex = updatedDecks.findIndex((d: Deck) => d.id === deck.id);
      if (deckIndex !== -1) {
        updatedDecks[deckIndex].cards = updatedCards;
        await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
        setDeck(updatedDecks[deckIndex]);
      }
    }

    setEditModalVisible(false);
  };

  if (!deck) {
    return (
      <View style={styles.detailContainer}>
        <Text>Deck nicht gefunden.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.detailContainer, { backgroundColor: deck.color }]}>
      {/* Zurück-Button */}
      <TouchableOpacity onPress={() => router.push('/')} style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text style={styles.subtitle}>{deck.cards?.length ?? 0} Karten</Text>

      <FlatList
        data={deck.cards || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onLongPress={() => openEditModal(index)}>
            <View style={styles.card}>
              <Text style={styles.cardQuestion}>{item.question}</Text>
              <Text style={styles.cardAnswer}>{item.answer}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" style={styles.buttonIcon} />
      </TouchableOpacity>

      {/* Modal: Neue Karte */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Neue Karte erstellen</Text>
            <TextInput
              placeholder="Frage"
              value={question}
              onChangeText={setQuestion}
              style={styles.input}
            />
            <TextInput
              placeholder="Antwort"
              value={answer}
              onChangeText={setAnswer}
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={[styles.primaryButton, { flex: 1, marginRight: 5 }]}
                onPress={saveCard}
              >
                <Text style={styles.buttonText}>Speichern</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dangerButton, { flex: 1, marginLeft: 5 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Abbrechen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Karte bearbeiten */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Karte bearbeiten</Text>
            <TextInput
              placeholder="Frage"
              value={editQuestion}
              onChangeText={setEditQuestion}
              style={styles.input}
            />
            <TextInput
              placeholder="Antwort"
              value={editAnswer}
              onChangeText={setEditAnswer}
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={[styles.primaryButton, { flex: 1, marginRight: 5 }]}
                onPress={saveEditedCard}
              >
                <Text style={styles.buttonText}>Speichern</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dangerButton, { flex: 1, marginLeft: 5 }]}
                onPress={deleteCard}
              >
                <Text style={styles.buttonText}>Löschen</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.secondaryButton, { marginTop: 15 }]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
