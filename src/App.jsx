
import { useEffect, useState ,useRef } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import Confetti from 'react-confetti';
  

function App() {
  const buttonRef = useRef(null)
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() =>({
      id : nanoid(),
      value : Math.floor(Math.random() * 6+1) ,
      isHeld : false,
      
      }))
  }


  const [dice , setDice] = useState(() => generateAllNewDice());
  let gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

function Hold(id) {
  setDice(prevDice =>
    prevDice.map(die => 
      (die.id === id ? {...die, isHeld: !die.isHeld }: die)
    )
  );
}

function rollDice(){
    setDice(prevDice => 
      prevDice.map(die => 
        die.isHeld ?  die : ({...die , value : Math.floor(Math.random() * 6+1)})  
      )
    )
}

function newGame(){
  setDice(prevDice => 
    prevDice.map(
      die => ({...die , value : Math.floor(Math.random() * 6+1) , isHeld : !die.isHeld})
    )
  )
}


console.log(dice) 
  const diceElements = dice.map((die) =>
            <Die
              Hold ={() => Hold(die.id)} 
              key={die.id}
              value={die.value}
              isHeld = {die.isHeld} 
            />
) 


useEffect(() => {
if(gameWon){
    buttonRef.current.focus()
}
},[gameWon])


  return (
    <>
      <main>
          {gameWon && <Confetti />}
          <div aria-live='polite' className='sr-only'>
            {gameWon && <p>Congratulations! You Won press "New Game" to start again .</p>}
          </div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>

          {gameWon ? <button className='roll-btn'  ref={buttonRef} onClick={newGame}>New Game</button> : <button className='roll-btn' onClick={rollDice}>Roll</button>}

      </main>
    </>
  )
}

export default App
