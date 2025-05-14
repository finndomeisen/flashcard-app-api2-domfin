import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';

type Deck = {
  id: string;
  title: string;
  color: string;
  cards?: Card[];
};

type Card = {
  question: string;
  answer: string;
};

export function DeckDetail() {
  const { id } = useLocalSearchParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const storedDecks = await AsyncStorage.getItem('decks');
        if (storedDecks) {
          const decks = JSON.parse(storedDecks);
          const selectedDeck = decks.find((d: Deck) => d.id === id);
          setDeck(selectedDeck ?? null);
        } else {
          setDeck(null);
        }
      } catch (error) {
        console.error('Fehler beim Laden des Decks:', error);
        setDeck(null);
      } finally {
        setLoading(false);
      }
    };

    loadDeck();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.detailContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!deck) {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.errorText}>Deck nicht gefunden.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.detailContainer, { backgroundColor: deck.color }]}>
      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text style={styles.subtitle}>{deck.cards?.length ?? 0} Karten</Text>

      <FlatList
        data={deck.cards || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardQuestion}>{item.question}</Text>
            <Text style={styles.cardAnswer}>{item.answer}</Text>
          </View>
        )}
      />
    </View>
  );
}

const Item = ({ id, title, color, cardCount, onPress, decks, setDecks }: { 
  id: string; 
  title: string; 
  color: string; 
  cardCount: number; 
  onPress: () => void;
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newColor, setNewColor] = useState(color);
  const gradientColors: [string, string] = [newColor, '#ffffff'];

  const saveDecks = async (updatedDecks: Deck[]) => {
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
    setDecks(updatedDecks);
  };

  const handleSave = () => {
    const updated = decks.map(deck =>
      deck.id === id ? { ...deck, title: newTitle, color: newColor } : deck
    );
    saveDecks(updated);
    setModalVisible(false);
  };

  const handleDelete = () => {
    const filtered = decks.filter(deck => deck.id !== id);
    saveDecks(filtered);
    setModalVisible(false);
  };

  const predefinedColors = ['#FF7F50', '#6495ED', '#90EE90', '#FFD700', '#FF69B4'];

  return (
    <>
      <TouchableOpacity onPress={onPress} onLongPress={() => setModalVisible(true)} style={styles.cardWrapper}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.item}
        >
          <Text style={styles.title}>{title}</Text>
          <Text>{cardCount} Karten</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
          <View style={{ backgroundColor: 'white', padding: 20, width: '85%', borderRadius: 10 }}>
            <Text style={{ marginBottom: 10 }}>Deck bearbeiten</Text>

            <Text style={{ marginTop: 10 }}>Titel:</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />

            <Text>Farbe wählen:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
              {predefinedColors.map((col) => (
                <TouchableOpacity
                  key={col}
                  onPress={() => setNewColor(col)}
                  style={{
                    backgroundColor: col,
                    width: 30,
                    height: 30,
                    margin: 5,
                    borderRadius: 15,
                    borderWidth: newColor === col ? 2 : 0,
                    borderColor: 'black'
                  }}
                />
              ))}
            </View>

            <Button title="Speichern" onPress={handleSave} />
            <View style={{ height: 10 }} />
            <Button title="Deck löschen" color="red" onPress={handleDelete} />
            <View style={{ height: 10 }} />
            <Button title="Abbrechen" color="gray" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default function AppIndex() {
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);

  const loadDecks = async () => {
    const storedDecks = await AsyncStorage.getItem('decks');
    if (storedDecks) {
      setDecks(JSON.parse(storedDecks));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Buttons oben */}
      <View style={styles.buttonAreaTop}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/create')}>
          <Text style={styles.buttonText}>+ Deck erstellen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={async () => {
            await AsyncStorage.removeItem('decks');
            setDecks([]);
          }}
        >
          <Text style={styles.buttonText}>Alle Decks löschen</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={decks}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            color={item.color}
            cardCount={item.cards?.length ?? 0}
            onPress={() => router.push(`/deck/${item.id}`)}
            decks={decks}
            setDecks={setDecks}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

