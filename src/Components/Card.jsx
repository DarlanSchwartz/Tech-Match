import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import MainContext from "../Contexts/MainContext";
import backface from '../../public/img/code.png';
import Swal from "sweetalert2";
import 'animate.css';

// import img1 from "../../public/img/c-sharp.png"
// import img2 from "../../public/img/C.png"
// import img3 from "../../public/img/c++.png"
// import img4 from "../../public/img/cmd.png"
// import img5 from "../../public/img/css.png"
// import img6 from "../../public/img/html.png"
// import img7 from "../../public/img/javascript.png"
// import img8 from "../../public/img/vscode.png"
// import img9 from "../../public/img/github.png"
// import img10 from "../../public/img/node.png"
// import img11 from "../../public/img/npm.png"
// import img12 from "../../public/img/rust.png"
// import img13 from "../../public/img/python.png"
// import img14 from "../../public/img/java.png"


export default function Card({ source }) {
    const [turned, setTurned] = useState(false);
    const [canTurn, setCanTurn] = useState(true);
    const {turnedCards, setTurnedCards, cards, setTurnedCardsAmount,turnedCardsAmount,setCanFlip,canFlip} = useContext(MainContext);

    useEffect(() => {
        if (turnedCards && turnedCards.length > 1) {
            if (turnedCards[0] == source && turnedCards[1] == source) {
                setCanTurn(false);
                setTurnedCards(null);
                setTurnedCardsAmount(turnedCardsAmount + 2);
                if(turnedCardsAmount == cards.length -2)
                {
                    Swal.fire({
                        title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:#1b1b1b;"> You have won the game!</span>`,
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
            else 
            {
                if (turnedCards[0] == source || turnedCards[1] == source) {
                    setCanFlip(false);
                    setTimeout(() => {
                        setTurned(false);
                        setTurnedCards(null);
                        setCanFlip(true);
                    }, 1000);
                }
            }
        }
    }, [turnedCards]);


    function Turn() {

        if(!canFlip || turned)
        {
            return;
        }

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
        <CardDiv className={turned ? 'front-face' : 'back-face'} turned={turned.toString()} unturnable={(!canTurn).toString()} onClick={Turn}>
            <img draggable='false' className="front" src={source} alt="" />
            <img draggable='false' className="back" src={backface} alt="" />
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
    border: 2px solid ${(props) => props.unturnable == 'true' ? '#f01a90' : 'rgba(0,0,0,0)'};

    transform:${(props) => props.turned == 'true' ? ' rotateY(180deg)' : 'rotateY(0deg)'};

    img{
        width: 80%;
        border-radius: 5px;
        pointer-events: none;
        position: absolute;
        user-select: none;
        pointer-events: none;
    }

    .back {
        backface-visibility: hidden;
    }
    .front{
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
`;