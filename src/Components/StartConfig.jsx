import { styled } from "styled-components";
import backface from '../../public/img/code.png';
import { useContext, useState } from "react";
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {AiFillMinusCircle} from 'react-icons/ai';
import MainContext from "../Contexts/MainContext";

export default function StartConfig()
{
    const [cardsAmount,setCardsAmount] = useState(4);
    const {startGame,avaiableCards} = useContext(MainContext);
    
    function sum(value)
    {
        setCardsAmount((prev) => {
           if(!(prev + value < 4) && !(prev + value > avaiableCards.length))
           {
                return prev + value;
           }

           return prev;
        });
    }

    const componentes = Array.from({ length: cardsAmount }, (_, index) => (
        <MiniCard key={index} />
      ));


    return(
        <StartConfigDiv>
            <div className="amount-container">
                <AiFillMinusCircle className="btn" onClick={()=> sum(-2)}/>
                <p>Cards amount {cardsAmount}</p>
                <BsFillPlusCircleFill className="btn" onClick={()=> sum(2)}/>
            </div>
            <div className="minicards-container">
               {componentes}
            </div>
            <button className="start-btn" onClick={()=> startGame(cardsAmount)}>Start game</button>
        </StartConfigDiv>
        
    );
}

const MiniCard = styled.div`

    width: 20px;
    height: 20px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${backface});
    background-size: 100%;
    user-select: none;
    flex-grow: 0;
    flex-shrink: 0;
`;

const StartConfigDiv = styled.div`

    max-width: 300px;
    width: 100%;
    max-height: 250px;
    height: 100%;
    background-color: #1b1b1b;
    border: 1px solid lightgray;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;

    .amount-container{
        display: flex;
        gap: 10px;
        user-select: none;
        p{
            user-select: none;
        }
        .btn{
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 0;
            font-size: 25px;
            color: #f01a90;
            cursor: pointer;
            user-select: none;
        }
    }

    .minicards-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 70%;
        gap: 2px;
        height: 87px;
    }

    p{
        color: white;
        font-family: 'Mulish', sans-serif;
        font-size: 20px;
    }

    .start-btn{
        height: 40px;
        width: 80%;
        border-radius: 20px;
        background-color: #cc0b76;
        color: white;
        border: 0;
        transition: all 100ms;
        user-select: none;

        &:hover{
            background-color: #f01a90;
        }

        &:disabled{
            background-color: #79104a;
            cursor: not-allowed;
        }
    }

`;