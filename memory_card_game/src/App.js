import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Cell from './components/Cell';

const cardImages = [
  { src: 'https://wallpapercave.com/wp/wp7454978.png', matched: false },
  { src: 'https://wallpaperset.com/w/full/1/9/2/498863.jpg', matched: false },
  {
    src: 'https://e0.pxfuel.com/wallpapers/392/506/desktop-wallpaper-yellow-cute-background-best-cute-cute-love-cute.jpg',
    matched: false,
  },
  { src: 'https://wallpaperset.com/w/full/0/b/4/498853.jpg', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
  };

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(()=>resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //starting the game automatically
  useEffect(()=>{
    shuffleCards();
  }, [])

  //handeling a choice
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //resetting the choices
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    setTurn(prevTurn => prevTurn + 1);
  };

  return (
    <div className="App">
      <h1>Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => {
          return <Cell 
                    handleChoice={handleChoice} 
                    card={card} 
                    key={card.id}
                    flipped={card===choiceOne ||    card===choiceTwo || card.matched} 
                  />;
        })}
      </div>
      <p>Turns:- {turn}</p>
    </div>
  );
}

export default App;
