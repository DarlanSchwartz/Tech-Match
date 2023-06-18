import { styled } from "styled-components";
import { RxHamburgerMenu } from 'react-icons/rx';
import { useContext, useState } from "react";
import logo from '../../public/img/favicon2.png';
import MainContext from "../Contexts/MainContext";

export default function Navbar() {
    const [showOptions, setShowOptions] = useState(false);
    const {gameStarted,score} = useContext(MainContext);

    function restartGame ()
    {
        window.location.reload();
    }

    return (
        <>
            {showOptions && <Modal onClick={() => setShowOptions(false)} />}
           

            <NavbarDiv>
                {gameStarted && <RxHamburgerMenu onClick={() => setShowOptions(true)} className="options-btn" />}
                {gameStarted && <p className="score">Score:{score}</p>}
                <img className="logo" src={logo} alt="pink head with brain inside" />
                <h1>Tech Match</h1>
            </NavbarDiv>
            <OptionsDiv show={showOptions.toString()}>
                <button onClick={restartGame }>Restart</button>
            </OptionsDiv>
        </>
    );
}

const NavbarDiv = styled.header`

    width: 100%;
    height: 80px;
    background-color: #1b1b1b;
    border-bottom: 0.5px solid lightgray;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    z-index: 2;

    .score{
        color: white;
        position: fixed;
        right: 70px;
        top: 25px;
        font-family: 'Mulish', sans-serif;
        font-size: 30px;
    }

    .logo{
        height: 60%;
        margin-left: 20px;
        user-select: none;
    }
    
    h1{
        
        color: white;
        font-family: 'Mulish', sans-serif;
        font-size: 30px;
        user-select: none;
    }
    .options-btn{
        cursor: pointer;
        color: white;
        position: fixed;
        right: 10px;
        top: 20px;
        font-size: 40px;
    }
`;

const OptionsDiv = styled.nav`
    width: 300px;
    height: calc(100% - 80px);
    background-color: #1b1b1b;
    border-left: 1px solid lightgray;
    position: fixed;
    right: ${(props) => props.show == 'true' ? '0' : '-300px'};
    top: 80px;
    transition: all 300ms;
    z-index: 4;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    button{
        width: 90%;
        height: 40px;
        border-radius: 20px;
        font-size: 20px;
        transition: all 200ms;
        
        &:nth-child(1)
        {
            margin-top: 40px;
        }

        &:hover{
            background-color: #c5c5c5;
        }
    }
`;

const Modal = styled.div`

    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 3;

`;