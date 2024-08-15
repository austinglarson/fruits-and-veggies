import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fruitData from './data/fruits.json'
import FoodList from './FoodList'
import GroceryList from './GroceryList'

function App() {
  console.log('Render app')
  //sendRecipeMessage()
  return (
    <div id="container">
      <header>
        <h1>Fruits and Veggies</h1>
      </header>

      <main>
        <GroceryList />

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
      </main>
    </div>
  )
}

export default App