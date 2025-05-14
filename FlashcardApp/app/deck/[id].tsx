import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  
  // Formular Zustände
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cardType, setCardType] = useState<'classic' | 'quiz'>('classic');
  const [quizAnswers, setQuizAnswers] = useState([
    { id: '1', text: '', correct: false },
    { id: '2', text: '', correct: false },
    { id: '3', text: '', correct: false },
    { id: '4', text: '', correct: false }
  ]);

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

    // Validierung
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

  // ... (Bearbeitungs- und Löschfunktionen ähnlich wie zuvor)

  if (!deck) {
    return (
      <View style={styles.detailContainer}>
        <Text>Deck nicht gefunden.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.detailContainer, { backgroundColor: deck.color }]}>
      {/* ... (Rest der Komponente ähnlich wie zuvor, aber mit verbessertem Styling) */}
    </View>
  );
}