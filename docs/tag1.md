# Tag 1

Heute war der einzige Tag im ZLI, der Rest der Woche hatten wir den zweiten Teil des ÜKs. 
      Wir haben mit dem Thema „Mobile Development mit React Native“ angefangen. 
      Ich finde das sehr cool, weil ich schon beim Sportferien Projekt ein Spiel auf Windows programmiert habe. 
      Jetzt wäre das toll, wenn ich das auch auf dem Handy machen könnte. 


![image](https://github.com/user-attachments/assets/b64f654a-b903-4779-b91e-63e2066faf4c)


---

## 🔧 Was habe ich heute gemacht?

Heute habe ich mit dem neuen Projekt gestartet, bei dem wir eine eigene **Flashcard-App** entwickeln. Am Anfang habe ich das **Projekt-Repository** auf GitHub erstellt und korrekt benannt: `flashcard-app-api2-domfin`. Danach habe ich **Reto als Collaborator** hinzugefügt, damit er Zugriff auf das Repo hat.

Ich habe mithilfe von `npx create-expo-app` ein leeres Expo-Projekt erstellt und mit `expo-router` die Navigation eingerichtet. Dafür musste ich zuerst die Ordnerstruktur mit einem `app/`-Ordner erstellen, um später verschiedene Screens einfach anlegen zu können.

Danach habe ich ein paar Grundkomponenten eingebaut, z. B. einen Homescreen und einen Deck-Detail-Screen. Dabei habe ich auch die erste **Navigation** mit Parameterübergabe (`[deckId].tsx`) ausprobiert – das war neu für mich, aber sehr spannend. Ich habe verstanden, wie `expo-router` das Routing automatisch aus der Dateistruktur ableitet.

---

## 🧠 Was habe ich gelernt?

- Wie man mit **expo-router** eine moderne Navigation mit Parameterübergabe umsetzt
- Wie man ein React Native Projekt mit Expo startet
- Wie `AsyncStorage` theoretisch funktioniert (wird später eingebaut)
- Wie wichtig es ist, von Anfang an eine klare **Projektstruktur** zu haben

---

## 🧩 Was waren Herausforderungen?

Ein bisschen schwierig war es, die neue Ordnerstruktur von `expo-router` zu verstehen, weil sie anders funktioniert als bei normalem React. Auch das erste Mal Routing mit `[deckId].tsx` war tricky, da man genau wissen muss, wie man die Parameter aus der URL liest.

Auerdem hat es etwas gedauert, bis mein Handy und mein Laptop im selben Netzwerk waren – ohne das konnte ich die App nicht live auf meinem Gerät testen.

---

## 📤 Abgabe & Dokumentation

Ich habe alle Änderungen heute in einem eigenen Branch gemacht und danach auf den `main`-Branch gemergt. Der Code funktioniert einwandfrei und wurde per GitHub gepusht. Zusätzlich habe ich eine kurze **Dokumentation im Ordner `docs/`** erstellt mit dem Namen `tag01.md`. Dort habe ich Screenshots eingefügt und erklärt, was ich gemacht habe.

---

## 🪞 Reflexion

Der Start ins Projekt war spannend. Ich finde es cool, dass wir eine eigene App entwickeln, die man wirklich auf dem Handy benutzen kann. Heute war vor allem Struktur und Setup wichtig, aber ich freue mich schon darauf, morgen mehr mit dem UI und dem State-Management zu arbeiten.
