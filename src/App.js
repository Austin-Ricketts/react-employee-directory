import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Persons from "./components/Persons";

function App() {
  return (
    <div className="App">
      <Header />
      <Wrapper>
        <Persons/>
      </Wrapper>
    </div>
  );
}

export default App;
