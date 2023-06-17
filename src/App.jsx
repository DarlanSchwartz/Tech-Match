import { useEffect, useState } from 'react'
import Card from './Components/Card';
import { styled } from 'styled-components';
import MainContext from './Contexts/MainContext';
import Navbar from './Components/Navbar';

export default function App() {
  const avaiableCards = [
    "./img/c-sharp.png",
    "./img/c-sharp.png",
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
  ];
  const [cards, setCards] = useState([]);
  const [turnedCards, setTurnedCards] = useState(null);

  useEffect(() => {
    sortCards();
  }, []);


  function comparador() {
    return Math.random() - 0.5;
  }

  function sortCards()
  {
    avaiableCards.sort(comparador);
    setCards([...avaiableCards]);
  }

  return (
    <MainContext.Provider value={{ cards, setCards, turnedCards, setTurnedCards,sortCards}}>
      <Navbar/>
      <CardsContainer>
        {cards.map((card, index) => <Card key={index} source={card} />)}
      </CardsContainer>
    </MainContext.Provider>
  );
}

const CardsContainer = styled.div`

  display: flex;
  width: 83%;
  flex-wrap: wrap;

  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

`;
