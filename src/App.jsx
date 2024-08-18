import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fruitData from './data/fruits.json'
import FoodList from './FoodList'
import GroceryList from './GroceryList'
import GroceryMarkup from './GroceryMarkup'

function App() {
  console.log('Render app')
  //sendRecipeMessage()

  const [isGroceryListHidden, setIsGroceryListHidden] = React.useState(true);

  const inputRef = React.useRef(null);
  function toggleGroceryList(event) {
    if (event.target.classList.contains("dialog") || event.target.classList.contains("close-dialog-btn") || event.target.id === 'groceryListButton') {
      setIsGroceryListHidden(prevIsGroceryListHidden => {
        if (prevIsGroceryListHidden && inputRef.current) {
          // Focus on last list item when opening
          setTimeout(() => {
            inputRef.current.focus();
          }, 0); // Wrap in setTimeout (https://stackoverflow.com/questions/2388164/set-focus-on-div-contenteditable-element/37162116#37162116)
        }
        return !prevIsGroceryListHidden
      });
    }
  }

  return (
    <div id="container">
      <header>
        <h1>Fruits and Veggies</h1>
      </header>

      <main>
        {/* <GroceryList /> */}

        <div id="filtersContainer">
          <select>
            <option value="name">Name</option>
            <option value="calories">Calories</option>
            <option value="sugar">Sugar</option>
            <option value="protein">Protein</option>
          </select>

          <div>
            <input type="checkbox" id="filterInSeason" name="inSeason" />
            <label htmlFor="inSeason">In Season</label>
          </div>
          <div>
            <input type="checkbox" id="filterFruits" name="fruits" />
            <label htmlFor="fruits">Fruits</label>
          </div>
          <div>
            <input type="checkbox" id="filterVeggies" name="veggies" />
            <label htmlFor="veggies">Vegetables</label>
          </div>
        </div>

        <section>
          <h2>Select your fruit:</h2>
          <FoodList />
        </section>

        <GroceryMarkup hidden={isGroceryListHidden} handleClick={toggleGroceryList} inputRef={inputRef} />
        <button id="groceryListButton" onClick={toggleGroceryList} aria-label="Open Grocery List"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" /></svg></button>
      </main>
    </div>
  )
}

export default App