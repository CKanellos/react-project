import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StyledDeckList = styled.div`
    display: flex;
`;

const StyledDeck = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
    }

    & > div:nth-of-type(2) {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #fff;
    }

    & a {
        flex: 1;
    }
`;

class DeckList extends Component {
    handlePlayButton = event => {
        this.props.dispatch({type: 'startGame'})
    }
    render() {
        const results = this.props.decks.filter((deck) => {
            return deck.title.toLowerCase().includes(this.props.query.toLowerCase());
        });
        return (
            <StyledDeckList>
                {results.map((deck) => {
                    return (
                        <StyledDeck key={deck.id}>
                            <div>
                                {deck.title}
                            </div>
                            <div>
                                <Link to={'/deck/' + deck.id} onClick={this.handlePlayButton}>Play</Link>
                            </div>
                        </StyledDeck>
                    );
                })}
            </StyledDeckList>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        query: state.searchQuery,
        decks: state.decks
    }
}

export default connect(mapStateToProps)(DeckList);