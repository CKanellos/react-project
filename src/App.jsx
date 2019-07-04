import React, { Component } from 'react';
import './main.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'; 
import CreateDeck from './CreateDeck';
import Navbar from './Navbar';
import DeckList from './DeckList';
import Game from './Game';

const renderHome = () => {
  return (
    <DeckList />
  );
}

const renderCreate = () => {
  return (
    <CreateDeck />
  );
}

const renderDeck = (routerData) => {
  let deckId = Number(routerData.match.params.id);
  return (
    <Game deckId={deckId} />
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Route path="/" exact render={renderHome} />
          <Route path="/create" exact render={renderCreate} />
          <Route path="/deck/:id" exact render={renderDeck} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
