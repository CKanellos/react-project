import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledResults = styled.div`
    margin: 10vh auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;

    & > div {
        flex: 1;
        padding: 10px;
        width: 100%;
    }

    & > div:nth-of-type(1) {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: #404040;
        color: #FFFFFF;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > div:nth-of-type(2) {
        background-color: white;
    }

    & > div:nth-of-type(3) {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    & .correct {
        color: green;
    }

    & .incorrect {
        color: red;
    }

    & .rating {
        text-align: center;
        font-size: 2rem;
    }

    & .question {
        font-size: 1.5rem;
    }

    & .card {
        padding: 0 10px;
    }
`;

class GameResults extends Component {
    handlePlayAgain = event => {
        this.props.dispatch({type: 'startGame'})
    }
    render() {
        let numCards = this.props.deck.cards.length;
        let numCorrect = 0;
        this.props.deck.cards.forEach((card, index) => {
            if (this.props.userAnswers[index] === card.answer) {
                numCorrect++;
            }
        });
        let successRate = numCorrect / numCards * 100;
        let rating;
        if (successRate === 0) {
            rating = "Does not get it at all 😞";
        } else if (successRate < 25) {
            rating = "Potential to get it one day 🤔"; 
        } else if (successRate < 50) {
            rating = "Kind of gets it 😐";
        } else if (successRate < 75) {
            rating = "On the road to getting it 🙂";
        } else if (successRate < 100) {
            rating = "Almost got it! 😄";
        } else { 
            rating = "Got it! 😎";
        }
        return (
            <StyledResults>
                <div>Results</div>
                <div>
                    <div className='rating'>
                        {rating}
                    </div>
                    {this.props.deck.cards.map((card, index) => {
                        return (
                            <div className='card' key={index}>
                                <p className='question'>{card.question}</p>
                                <p>Answer: {card.choices[card.answer]}</p>
                                <p className={this.props.userAnswers[index] === card.answer ? 'correct' : 'incorrect'}>
                                    Your answer: {card.choices[this.props.userAnswers[index]]}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div><button onClick={this.handlePlayAgain}>Play again</button></div>
            </StyledResults>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        userAnswers: state.userAnswers
    };
}

export default connect(mapStateToProps)(GameResults);