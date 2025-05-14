Objektorientierte Analyse der Flashcard-App
===========================================

1\. Kapselung (Encapsulation)
-----------------------------

**Was bedeutet das?**\
Kapselung heisst: Man versteckt gewisse Dinge im Code, damit sie von aussen nicht verändert oder falsch benutzt werden können. Nur das, was gebraucht wird, wird nach aussen sichtbar gemacht.

**Wo sieht man das im Code?**\
Beispiel: Die `Storage`-Klasse speichert Daten. Die Methode `serialize` ist *privat*, das heisst, nur die Klasse selbst kann sie benutzen. Für den Rest des Codes gibt es eine *öffentliche* Methode `storeData`, die klar vorgibt, wie Daten gespeichert werden.

```
class Storage {
  private static async serialize(data: any): string { ... }
  public static async storeData(id: string, value: any) { ... }
}

```

Auch in React-Komponenten sieht man Kapselung:

```
const QuizCard = ({ options }) => {
  const [selected, setSelected] = useState<number|null>(null);
  // selected ist nur intern sichtbar
}

```

**So könnte man es noch besser machen:**

```
class Deck {
  private cards: Card[] = [];

  public addCard(card: Card) {
    this.cards.push(this.validateCard(card));
  }

  private validateCard(card: Card): Card {
    if (!card.question) throw new Error("Ungültige Karte");
    return card;
  }
}

```

* * * * *

2\. Abstraktion (Abstraction)
-----------------------------

**Was bedeutet das?**\
Abstraktion heisst: Man beschreibt Dinge allgemeiner, sodass man nicht wissen muss, wie sie genau funktionieren -- nur *was* sie tun.

**Beispiele aus dem Code:**

-   Das `CardBase`-Interface sagt, wie jede Karte aufgebaut ist:

```
interface CardBase {
  id: string;
  type: CardType;
  question: string;
}

```

-   Auch der Zugriff auf den Speicher wird abstrahiert:

```
interface DataStorage {
  save(deck: Deck): Promise<void>;
  load(id: string): Promise<Deck>;
}

```

**Besser wäre zum Beispiel:**\
Man könnte ein Grundgerüst für das Zeichnen von Karten machen:

```
abstract class CardRenderer {
  constructor(protected card: Card) {}
  abstract renderFront(): JSX.Element;
  abstract renderBack(): JSX.Element;
}

```

* * * * *

3\. Vererbung (Inheritance)
---------------------------

**Was bedeutet das?**\
Vererbung bedeutet: Eine Klasse kann von einer anderen Klasse „erben" und bekommt so deren Eigenschaften.

**Aktuell ist der Code so aufgebaut:**

```
type Card = FlipCard | QuizCard;

interface FlipCard {
  type: "FLIP";
  answer: string;
}

interface QuizCard {
  type: "QUIZ";
  options: string[];
}

```

**Mit Vererbung könnte man das so machen:**

```
abstract class Card {
  constructor(
    public id: string,
    public question: string
  ) {}
}

class FlipCard extends Card {
  constructor(
    public answer: string,
    id: string,
    question: string
  ) {
    super(id, question);
  }
}

```

* * * * *

4\. Polymorphie (Polymorphism)
------------------------------

**Was bedeutet das?**\
Polymorphie bedeutet: Objekte können auf verschiedene Arten dargestellt oder benutzt werden, auch wenn sie von der gleichen Oberklasse kommen.

**So ist es aktuell:**

```
function CardView({ card }: { card: Card }) {
  switch(card.type) {
    case "FLIP": return <FlipCardView card={card} />;
    case "QUIZ": return <QuizCardView card={card} />;
  }
}

```

**Eleganter wäre:**

```
interface CardComponent {
  render(): JSX.Element;
  getMeta(): CardMeta;
}

class FlipCardComponent implements CardComponent {
  constructor(private card: FlipCard) {}

  render() {
    return <FlipCardView {...this.card} />;
  }
}

```

* * * * *

Konkrete Codebeispiele
----------------------

### 1\. Deck-Modell

```
class Deck {
  constructor(
    public readonly id: string,
    public name: string,
    private cards: Card[] = [],
    public colorIndex: number = 0
  ) {}

  public get cardCount(): number {
    return this.cards.length;
  }

  public addCard(card: Card) {
    this.cards = [...this.cards, card];
  }
}

```

### 2\. Komponenten-Struktur

```
interface CardProps<T extends Card> {
  card: T;
  onFlip?: () => void;
}

function FlipCard({ card }: CardProps<FlipCard>) {
  // zeigt eine Karte an
}

```

* * * * *

Verbesserungsideen
------------------

### 1\. Dependency Injection

Man kann den Speicher als Parameter übergeben, statt ihn fest einzubauen:

```
class DeckService {
  constructor(private storage: DataStorage) {}

  async saveDeck(deck: Deck) {
    await this.storage.save(deck.id, deck);
  }
}

```

### 2\. Factory-Methode

Eine Art Bauplan für Karten:

```
class CardFactory {
  static create(config: CardConfig): Card {
    switch(config.type) {
      case "FLIP":
        return new FlipCard(config);
      case "QUIZ":
        return new QuizCard(config);
    }
  }
}

```

* * * * *

OO-Design in klassischem UML-Stil
---------------------------------

```
classDiagram
  class DataStorage {
    <<interface>>
    +save(id: string, data: any) Promise<void>
    +load(id: string) Promise<any>
  }

  class DeckController {
    -storage: DataStorage
    +createDeck(name: string) Deck
    +saveDeck(deck: Deck): Promise<void>
  }

  class Deck {
    -id: string
    -cards: Card[]
    +addCard(card: Card): void
    +getCard(id: string): Card
  }

  class Card {
    <<abstract>>
    #id: string
    #question: string
    +render(): JSX.Element
  }

  DataStorage <|.. AsyncStorageAdapter
  DeckController *-- DataStorage
  DeckController *-- Deck
  Deck *-- Card
  Card <|-- FlipCard
  Card <|-- QuizCard

```

