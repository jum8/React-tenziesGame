import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(1);

  function newDie() {
    return {
      value: Math.floor(6 * Math.random()) + 1,
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = [];
    for(let i = 0; i < 10; i++) {
        newDice.push(newDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : newDie()
    }))
    setRollsCount(prevRollsCount => prevRollsCount + 1)
  }

  function startNewGame() {
    setTenzies(false);
    setDice(allNewDice());
    setRollsCount(1);
  }
  
  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map(die => (die.id === id ? {...die, isHeld:!die.isHeld} : die));
    })
  }

  function checkWinningConditions(diceArray) {
    const firstValue = diceArray[0].value; 
    for(let i = 0; i < diceArray.length; i++) {
      const die = diceArray[i];
      if(!die.isHeld || die.value !== firstValue) {
        return false;
      }  
    }
    return true;
  }

  React.useEffect(() =>{
    if(checkWinningConditions(dice)) {
      setTenzies(true);
    }
  }, [dice])

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)
  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={tenzies ? startNewGame : rollDice}>{tenzies ? "New game" : "Roll"}</button>
      <p className="rollCounter">Number of rolls: {rollsCount}</p>
    </main>
  );
}

export default App;
