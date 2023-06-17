import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import MainContext from "../Contexts/MainContext";
import backface from '../../public/img/code.png';
import Swal from "sweetalert2";
import 'animate.css';

export default function Card({ source }) {
    const [turned, setTurned] = useState(false);
    const [canTurn, setCanTurn] = useState(true);
    const {turnedCards, setTurnedCards, cards, setTurnedCardsAmount,turnedCardsAmount} = useContext(MainContext);

    useEffect(() => {
        if (turnedCards && turnedCards.length > 1) {
            if (turnedCards[0] == source && turnedCards[1] == source) {
                setCanTurn(false);
                setTurnedCards(null);
                setTurnedCardsAmount(turnedCardsAmount + 2);
                if(turnedCardsAmount == cards.length -2)
                {
                    Swal.fire({
                        title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:#1b1b1b;">You have won the game</span>`,
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        },
                        heightAuto: false,
                        confirmButtonText:'Restart game',
                        confirmButtonColor:'#cc0b76',
                        cancelButtonText:'Back',
                        showCancelButton:true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            }
            else {
                if (turnedCards[0] == source || turnedCards[1] == source) {
                    setTimeout(() => {
                        setTurned(false);
                        setTurnedCards(null);
                    }, 1000);
                }
            }
        }
    }, [turnedCards]);


    function Turn() {
        if (!canTurn || (turnedCards != null && turnedCards.length == 2)) {
            return;
        }

        setTurned(true);

        if (turnedCards == null) {
            setTurnedCards([source]);
        }
        else {
            setTurnedCards([...turnedCards, source]);
        }
    }

    return (
        <CardDiv className={turned ? 'front-face' : 'back-face'} turned={turned.toString()} onClick={Turn}>
            <img className="front" src={source} alt="" />
            <img className="back" src={backface} alt="" />
        </CardDiv>
    );
}

const CardDiv = styled.div`

    width: 150px;
    height: 150px;
    border-radius: 20px;

    background-color: white;
    transition: all .5s;
    cursor: pointer;
    flex-grow: 0;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    position: relative;

    transform:${(props) => props.turned == 'true' ? ' rotateY(180deg)' : 'rotateY(0deg)'};

    img{
        width: 80%;
        border-radius: 5px;
        pointer-events: none;
        position: absolute;
    }

    .back {
        backface-visibility: hidden;
    }
    .front{
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
`;