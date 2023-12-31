import { useEffect, useState } from 'react'
import Card from './Components/Card';
import { styled } from 'styled-components';
import MainContext from './Contexts/MainContext';
import Navbar from './Components/Navbar';
import StartConfig from './Components/StartConfig';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export default function App() {
  const avaiableCards = [
    "./img/c-sharp.png",
    "./img/c-sharp.png",
    "./img/vue.png",
    "./img/vue.png",
    "./img/C.png",
    "./img/C.png",
    "./img/c++.png",
    "./img/c++.png",
    "./img/cmd.png",
    "./img/cmd.png",
    "./img/css.png",
    "./img/css.png",
    "./img/html.png",
    "./img/html.png",
    "./img/react.png",
    "./img/react.png",
    "./img/javascript.png",
    "./img/javascript.png",
    "./img/vscode.png",
    "./img/vscode.png",
    "./img/github.png",
    "./img/github.png",
    "./img/node.png",
    "./img/node.png",
    "./img/npm.png",
    "./img/npm.png",
    "./img/rust.png",
    "./img/rust.png",
    "./img/python.png",
    "./img/python.png",
    "./img/java.png",
    "./img/java.png",
    "./img/gpt.png",
    "./img/gpt.png",
    "./img/typescript.png",
    "./img/typescript.png",
    "./img/angular.png",
    "./img/angular.png",
    "./img/php.png",
    "./img/php.png",
  ];
  const [cards, setCards] = useState([]);
  const [turnedCards, setTurnedCards] = useState(null);
  const [turnedCardsAmount, setTurnedCardsAmount] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [canFlip, setCanFlip] = useState(true);
  const { width, height } = useWindowSize();

  function startGame(amountOfCards) {
    const gameCards = amountOfCards < avaiableCards.length ? avaiableCards.slice(0, amountOfCards) : [...avaiableCards];
    gameCards.sort(comparador);
    console.log('amout:',amountOfCards,'total', avaiableCards.length)
    setCards(gameCards);
    setGameStarted(true);
    setScore(0);
  }

  function updateScore(value)
  {
    setScore((prev)=> {return prev + value});
  }

  function comparador() {
    return Math.random() - 0.5;
  }

  return (
    <MainContext.Provider value={{ cards, setCards, turnedCards, setTurnedCards, setTurnedCardsAmount, turnedCardsAmount, startGame, avaiableCards, gameStarted ,setCanFlip, canFlip,score,updateScore}}>
      <Navbar />
      {
        gameStarted
          ? <CardsContainer>
            {cards.map((card, index) => <Card key={index} source={card} />)}
            {turnedCardsAmount == cards.length && <Confetti
              width={width}
              height={height}
            />}
          </CardsContainer>
          : <StartConfig />
      }

    </MainContext.Provider>
  );
}

const CardsContainer = styled.div`

    display: flex;
    width: 83%;
    flex-wrap: wrap;
    flex-shrink: 0;
    flex-grow: 0;
    flex-direction: row;
    gap: 10px;
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    height: fit-content;
    overflow: hidden;
`;
