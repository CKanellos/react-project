import { createStore } from 'redux';
import { initialDecks } from './data';

const initialState = {
    searchQuery: '',
    gameCardIndex: 0,
    userAnswers: [],
    decks: initialDecks,
    creatingDeck: {
        id: initialDecks.length,
        title: '',
        cards: [{question: '', choices: ['', ''], answer: null}]
    }
}

const reducer = (state = initialState, action) => {
    let creatingDeckId;
    let newCard;
    let newCards;
    switch (action.type) {
        case 'query': 
            return { ...state, searchQuery: action.q };
        case 'startGame':
            return { ...state, gameCardIndex: 0, userAnswers: [] };
        case 'submitAnswer':
            return { ...state, gameCardIndex: state.gameCardIndex + 1, 
                userAnswers: state.userAnswers.concat([action.answer]) };
        case 'startCreateDeck':
            creatingDeckId = state.decks.length;
            newCard = {question: '', choices: ['', ''], answer: null};
            return { ...state, creatingDeck: {id: creatingDeckId, title: '', cards: [newCard]} };
        case 'creatingDeckTitle':
            return { ...state, creatingDeck: { ...state.creatingDeck, title: action.newTitle }}
        case 'creatingDeckAddCard':
            newCard = {question: '', choices: ['', ''], answer: null};
            return { ...state, creatingDeck: { ...state.creatingDeck, cards: state.creatingDeck.cards.concat([newCard])} };
        case 'creatingCardQuestion':
            newCards = state.creatingDeck.cards.slice();
            newCards[action.cardIndex].question = action.newQuestion;
            return { ...state, creatingDeck: { ...state.creatingDeck, cards: newCards }};
        case 'creatingCardRemoveChoice': 
            newCards = state.creatingDeck.cards.slice();
            newCards[action.cardIndex].choices.pop();
            if (newCards[action.cardIndex].choices.length === newCards[action.cardIndex].answer) {
                newCards[action.cardIndex].answer = null;
            }
            return { ...state, creatingDeck: { ...state.creatingDeck, cards: newCards }};
        case 'creatingCardAddChoice':
            newCards = state.creatingDeck.cards.slice();
            newCards[action.cardIndex].choices.push('');
            return { ...state, creatingDeck: { ...state.creatingDeck, cards: newCards }};
        case 'creatingCardChoice':
            newCards = state.creatingDeck.cards.slice();
            newCards[action.cardIndex].choices[action.choiceIndex] = action.newChoice;
            return { ...state, creatingDeck: { ...state.creatingDeck, cards: newCards }};
        case 'creatingCardMarkAsAnswer':
            newCards = state.creatingDeck.cards.slice();
            newCards[action.cardIndex].answer = action.answer;
            return { ...state, creatingDeck: { ...state.creatingDeck, cards: newCards }};
        case 'creatingDeckSubmit':
            creatingDeckId = state.decks.length + 1;
            return {
                ...state,
                decks: state.decks.concat([state.creatingDeck]),
                creatingDeck: {
                    id: creatingDeckId,
                    title: '',
                    cards: [{question: '', choices: ['', ''], answer: null}]
                }
            };
        default:
            return state;
    }
}

const store = createStore(reducer, initialState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;