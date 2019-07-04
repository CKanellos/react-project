import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GameResults from './GameResults';

const StyledCard = styled.div`
    margin: 20vh auto; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;

    & > div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 100%;
    }

    & > div:nth-of-type(1) {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: #404040;
        color: #FFFFFF;
        font-size: 2rem;
    }

    & > div:nth-of-type(2) {
        padding: 0;
        width: calc(100% + 20px);
        justify-content: flex-start;

        & .progress {
            background-color: #2196f3;
            height: 20px;
        }
    }

    & > div:nth-of-type(3) {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
    }

    & button {
        flex: 1;
        width: 100%;
        margin: 10px;
        font-size: 1.5rem;
    }
`;

class Game extends Component {
    handleUserAnswer = (event, index) => {
        this.props.dispatch({type: 'submitAnswer', answer: index })
    }
    render() {
        let deck = this.props.decks.find((deck) => {
            return deck.id === this.props.deckId;
        });
        if (this.props.cardIndex === deck.cards.length) {
            return (
                <GameResults deck={deck} />
            );
        }
        let card = deck.cards[this.props.cardIndex];
        let progress = this.props.cardIndex / deck.cards.length * 100;
        return (
            <StyledCard>
                <div>
                    {card.question}
                </div>
                <div>
                    <div className="progress" style={{width: progress + '%'}}></div>

                </div>
                <div>
                    {card.choices.map((choice, index) => {
                        return (
                            <button onClick={(event) => this.handleUserAnswer(event, index)} key={index}>{choice}</button>
                        );
                    })}
                </div>
            </StyledCard>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cardIndex: state.gameCardIndex,
        decks: state.decks
    };
}

export default connect(mapStateToProps)(Game);