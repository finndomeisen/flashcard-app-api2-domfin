# Tag 2
---
zweite tag mit react native und expo go 
      weiter an aufträgen, von letztem mal noch aufgearbeitet 
      dann mit neuen aufgaben begonnen
      viel gelernt, z.b. button erstellen, welchen lokal ein deck erstellt
      dann auch noch button welche alle decks löscht
      


update foto vom 09.04

## 🔧 Was habe ich heute gemacht?

Heute ging es darum, meiner Flashcard-App echte Funktionalität zu geben. Ich habe gelernt, wie man **eigene Daten wie Decks erstellt, speichert und anzeigt**. Dafür habe ich das erste Mal mit **AsyncStorage** gearbeitet, um die Daten lokal auf dem Gerät zu speichern, auch wenn die App neu gestartet wird.

Ich habe eine Seite erstellt, auf der man über ein **TextInput-Feld** ein neues Deck hinzufügen kann. Sobald man den Namen eingibt und bestätigt, wird das Deck als Objekt gespeichert und automatisch in einer **FlatList** auf der Startseite angezeigt.

Zusätzlich habe ich `useEffect` und `useFocusEffect` genutzt, um die Daten zu laden, wenn man die App startet oder zur Hauptseite zurückkehrt. Das war eine neue Art, mit React Hooks umzugehen, und ich musste ein bisschen recherchieren, wie genau das Zusammenspiel mit AsyncStorage funktioniert.

---

## 🧠 Was habe ich gelernt?

- Wie man **Formularwerte mit TextInput aufnimmt**
- Wie man **Daten mit AsyncStorage speichert und lädt**
- Wie man eine **dynamische Benutzeroberfläche mit FlatList** erstellt
- Wie man mit `useFocusEffect` und `useEffect` Daten beim Seitenwechsel lädt
- Wie man **einfache Validierungen** für Nutzereingaben einbaut (z. B. keine leeren Decknamen zulassen)

---

## 🧩 Was waren Herausforderungen?

Die grösste Herausforderung heute war, zu verstehen, wie AsyncStorage funktioniert – besonders das Asynchrone (Promises und `await`). Ich musste aufpassen, dass ich die Daten richtig speichere und sie nicht überschreibe. Auch beim Laden der Daten aus dem Speicher war es nicht sofort klar, wie man aus dem gespeicherten JSON-String wieder ein JavaScript-Objekt macht.

Ein weiteres Problem war, dass die FlatList manchmal nicht korrekt aktualisiert wurde, wenn ein neues Deck erstellt wurde. Ich habe das mit einem State-Update nach dem Speichern gelöst.

---

## 📤 Abgabe & Dokumentation

Ich habe meine Änderungen in einem neuen Branch umgesetzt und dann auf den `main`-Branch gemergt. Der Code funktioniert stabil, und die neuen Features wie Deck-Erstellung, Speicherung und Anzeige sind alle drin.

Im Ordner `docs/` habe ich die Datei `tag02.md` erstellt. Darin sind Screenshots der App, wichtige Code-Ausschnitte und eine kurze Erklärung der heutigen Arbeit enthalten.

---

## 🪞 Reflexion

Heute war es richtig spannend, weil die App endlich angefangen hat, "echt" zu wirken. Es ist cool zu sehen, wie etwas, das man eingibt, gespeichert wird und dann beim nächsten Öffnen der App noch da ist. Ich finde es faszinierend, wie alles zusammenspielt – UI, Daten, Logik. Morgen freue ich mich darauf, mehr am Design und an weiteren Funktionen zu arbeiten.


