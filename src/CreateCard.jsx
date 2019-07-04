import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledCreateCard = styled.div`
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
    margin: 10px 0;
    background-color: #f0f0f0;

    & .buttons {
        text-align: center;
    }

    & button.addRemove {
        width: auto;
    }

    & .choice {
        display: flex;
        justify-content: space-between;
    }
`;

class CreateCard extends Component {
    handleQuestionChange = (event) => {
        this.props.dispatch({
            type: 'creatingCardQuestion', 
            cardIndex: this.props.cardIndex, 
            newQuestion: event.target.value
        });
    }
    handleChoiceChange = (event, index) => {
        this.props.dispatch({type: 'creatingCardChoice', cardIndex: this.props.cardIndex, choiceIndex: index, newChoice: event.target.value})
    }
    handleAddChoice = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'creatingCardAddChoice', cardIndex: this.props.cardIndex})
    }
    handleRemoveChoice = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'creatingCardRemoveChoice', cardIndex: this.props.cardIndex})
    }
    handleMarkAsAnswer = (event, index) => {
        this.props.dispatch({type: 'creatingCardMarkAsAnswer', cardIndex: this.props.cardIndex, answer: index})
    }
    render() { 
        return (
            <StyledCreateCard>
                Question {this.props.cardIndex}<br /><input type='text' onChange={this.handleQuestionChange} value={this.props.deck.cards[this.props.cardIndex].question} /><br />
                {this.props.deck.cards[this.props.cardIndex].choices.map((choice, index) => {
                    return (
                        <div key={index}>
                            <div className='choice'>
                                <div>Choice {index}</div>
                                <div>Mark as answer<input type='radio' name={'choicesCard' + this.props.cardIndex} value={choice} onClick={(event) => this.handleMarkAsAnswer(event, index)} /></div>
                            </div>
                            <input type='text' onChange={(event) => this.handleChoiceChange(event, index)} value={choice} />
                        </div>
                    );
                })}
                <div className='buttons'>
                    <button className='addRemove' onClick={this.handleRemoveChoice}>Remove choice</button><br />
                    <button className='addRemove' onClick={this.handleAddChoice}>Add choice</button>
                </div>
            </StyledCreateCard>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        deck: state.creatingDeck
    };
}
 
export default connect(mapStateToProps)(CreateCard);