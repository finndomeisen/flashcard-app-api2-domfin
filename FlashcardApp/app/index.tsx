import React from 'react';
import { View, Text, Button } from 'react-native'; 
import { useRouter } from 'expo-router'; 

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "	#FF00FF",
      }}
    >
      <Text style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20, color: "magenta", textAlign: 'center' }}>
        Willkommen zu meiner Flashcard App!
      </Text>
      <Button title="Deck erstellen" onPress={() => router.push('/create')} />
      <Button title="Deck Detail (Beispiel)" onPress={() => router.push('/deck/123')} />
      
    </View>
  );
}

