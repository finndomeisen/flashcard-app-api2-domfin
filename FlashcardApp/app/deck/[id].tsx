import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router'; // useRouter importiert
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

type Card = {
  id: string;
  question: string;
  type: 'classic' | 'quiz';
  answer?: string;
  answers?: { id: string; text: string; correct: boolean }[];
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
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cardType, setCardType] = useState<'classic' | 'quiz'>('classic');
  const [quizAnswers, setQuizAnswers] = useState([
    { id: '1', text: '', correct: false },
    { id: '2', text: '', correct: false },
    { id: '3', text: '', correct: false },
    { id: '4', text: '', correct: false }
  ]);
  
  const router = useRouter(); // useRouter hook

  const loadDeck = async () => {
    try {
      const storedDecks = await AsyncStorage.getItem('decks');
      if (storedDecks) {
        const decks = JSON.parse(storedDecks);
        const selectedDeck = decks.find((d: Deck) => d.id === id);
        setDeck(selectedDeck ?? null);
      }
    } catch (error) {
      console.error('Fehler beim Laden des Decks:', error);
    }
  };

  useEffect(() => {
    loadDeck();
  }, [id]);

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setCardType('classic');
    setQuizAnswers([
      { id: '1', text: '', correct: false },
      { id: '2', text: '', correct: false },
      { id: '3', text: '', correct: false },
      { id: '4', text: '', correct: false }
    ]);
  };

  const saveDeck = async (updatedDeck: Deck) => {
    try {
      const storedDecks = await AsyncStorage.getItem('decks');
      let updatedDecks: Deck[] = [];

      if (storedDecks) {
        updatedDecks = JSON.parse(storedDecks);
        const deckIndex = updatedDecks.findIndex(d => d.id === id);
        if (deckIndex !== -1) {
          updatedDecks[deckIndex] = updatedDeck;
          await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
          setDeck(updatedDeck);
        }
      }
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  const handleSaveCard = async () => {
    if (!deck) return;

    if (question.trim() === '') {
      Alert.alert('Fehler', 'Die Frage darf nicht leer sein.');
      return;
    }

    if (cardType === 'classic' && answer.trim() === '') {
      Alert.alert('Fehler', 'Die Antwort darf nicht leer sein.');
      return;
    }

    if (cardType === 'quiz') {
      const emptyAnswer = quizAnswers.some(a => a.text.trim() === '');
      const noCorrect = !quizAnswers.some(a => a.correct);

      if (emptyAnswer) {
        Alert.alert('Fehler', 'Alle Antwortfelder müssen ausgefüllt sein.');
        return;
      }

      if (noCorrect) {
        Alert.alert('Fehler', 'Mindestens eine Antwort muss als richtig markiert sein.');
        return;
      }
    }

    const newCard: Card = {
      id: Date.now().toString(),
      question: question.trim(),
      type: cardType,
      ...(cardType === 'classic'
        ? { answer: answer.trim() }
        : { answers: quizAnswers.map(a => ({ ...a, text: a.text.trim() })) })
    };

    const updatedDeck = {
      ...deck,
      cards: [...(deck.cards || []), newCard]
    };

    await saveDeck(updatedDeck);
    resetForm();
    setModalVisible(false);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{deck.title}</Text>
      </View>

      <FlatList
        data={deck.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>
            {item.type === 'classic' ? (
              <Text style={styles.answer}>{item.answer}</Text>
            ) : (
              item.answers?.map((a) => (
                <Text key={a.id} style={{ color: a.correct ? 'green' : 'black' }}>
                  - {a.text}
                </Text>
              ))
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal zum Hinzufügen */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Neue Karte hinzufügen</Text>

          {/* Kartentyp-Auswahl */}
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: cardType === 'classic' ? '#4CAF50' : '#ccc' }]}
              onPress={() => setCardType('classic')}
            >
              <Text style={styles.buttonText}>Classic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: cardType === 'quiz' ? '#2196F3' : '#ccc' }]}
              onPress={() => setCardType('quiz')}
            >
              <Text style={styles.buttonText}>Quiz</Text>
            </TouchableOpacity>
          </View>

          {/* Frage */}
          <TextInput
            placeholder="Frage"
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
          />

          {/* Klassische Karte */}
          {cardType === 'classic' && (
            <TextInput
              placeholder="Antwort"
              style={styles.input}
              value={answer}
              onChangeText={setAnswer}
            />
          )}

          {/* Quizkarte */}
          {cardType === 'quiz' && quizAnswers.map((a, index) => (
            <View key={a.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <TextInput
                placeholder={`Antwort ${index + 1}`}
                style={[styles.input, { flex: 1 }]}
                value={a.text}
                onChangeText={(text) => {
                  const updated = [...quizAnswers];
                  updated[index].text = text;
                  setQuizAnswers(updated);
                }}
              />
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  backgroundColor: a.correct ? 'green' : 'gray',
                  padding: 10,
                  borderRadius: 5
                }}
                onPress={() => {
                  const updated = quizAnswers.map((ans, i) => ({
                    ...ans,
                    correct: i === index
                  }));
                  setQuizAnswers(updated);
                }}
              >
                <Ionicons name="checkmark" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={handleSaveCard}>
              <Text style={styles.buttonText}>Speichern</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={() => {
                resetForm();
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
