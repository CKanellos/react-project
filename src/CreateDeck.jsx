import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateCard from './CreateCard';
import styled from 'styled-components';

const StyledCreateDeck = styled.div`
    margin: 10vh auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;

    & > div {
        flex: 1;
        padding: 10px 100px;
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

    & input[type="submit"] {
        width: 100%;
    }

    & input[type="text"] {
        border-radius: 5px;
        padding: 10px;
        width: calc(100% - 20px);
        margin: 10px 0;
    }

    & button {
        background: white;
        color: black;
        width: 100%;
        margin: 10px 0;
    }

    & form > button {
        margin: 20px 0;
    }
`;

class CreateDeck extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'creatingDeckSubmit'})
    }
    handleAddCard = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'creatingDeckAddCard'})
    }
    handleTitleChange = (event) => {
        this.props.dispatch({type: 'creatingDeckTitle', newTitle: event.target.value})
    }
    render() { 
        return (
            <StyledCreateDeck>
                <div>Create a deck</div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        Title<br /><input type='text' onChange={this.handleTitleChange} value={this.props.deck.title} />
                        {this.props.deck.cards.map((card, index) => {
                            return (
                                <CreateCard cardIndex={index} key={index} />
                            );
                        })}
                        <button onClick={this.handleAddCard}>Add card</button>
                        <input type='submit' />
                    </form>
                </div>
            </StyledCreateDeck>
        );
    }
}


 
const mapStateToProps = (state) => {
    return {
        deck: state.creatingDeck
    };
}
 
export default connect(mapStateToProps)(CreateDeck);