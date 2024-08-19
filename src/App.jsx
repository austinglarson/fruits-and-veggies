import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fruitData from './data/fruits.json'
import vegetablesData from './data/vegetables.json'
import FoodList from './FoodList'
import GroceryList from './GroceryList'
import GroceryMarkup from './GroceryMarkup'

function App() {
  //console.log('Render app')
  const [food, setFood] = React.useState([]);
  const [foodFilters, setFoodFilters] = React.useState({sort: '', isSeason: false, fruit: false, vegetable: false});
  const [isGroceryListHidden, setIsGroceryListHidden] = React.useState(true);

  function getMonth(month) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1];
  }
  const currentMonth = new Date().getMonth()

  React.useEffect(() => {
    let foods = {};
    for (let foodKey in fruitData) {
      const foodItem = fruitData[foodKey];
      foodItem['nameKey'] = foodKey;
      foodItem['type'] = 'fruit';
      foodItem['hidden'] = false;
      foods[foodKey] = foodItem;
    }
    for (let foodKey in vegetablesData) {
      const foodItem = vegetablesData[foodKey];
      foodItem['nameKey'] = foodKey;
      foodItem['type'] = 'vegetable';
      foodItem['hidden'] = false;
      foods[foodKey] = foodItem;
    }

    foods = Object.values(foods).sort((a, b) => a.name.localeCompare(b.name));
    setFood(foods);
  }, []);

  React.useEffect(() => {
		if (food.length > 0) {
			setFood(prevFood => {
        prevFood.sort((a, b) => {
          if (foodFilters.sort === 'name') {
            return a.name.localeCompare(b.name);
          } else if (foodFilters.sort === 'protein') {
            return b.nutritions[foodFilters.sort] - a.nutritions[foodFilters.sort];
          } else {
            return a.nutritions[foodFilters.sort] - b.nutritions[foodFilters.sort];
          }
        });

        return prevFood.map(food => {
          if (foodFilters.inSeason && (currentMonth < food.season.start || currentMonth >= food.season.end)) { // if not in season
            return { ...food, hidden: true };
          }
          if (foodFilters.fruit && food.type !== 'fruit') {
            return { ...food, hidden: true };
          }
          if (foodFilters.vegetable && food.type !== 'vegetable') {
            return { ...food, hidden: true };
          }
          return { ...food, hidden: false };
        })
      });
		}
  }, [foodFilters]);

  function updateFoodFilters(event) {
		setFoodFilters(prevFoodFilters => {
			const {name, value, type, checked} = event.target
			return {
				...prevFoodFilters,
				[name]: type === 'checkbox' ? checked : value
			}
		})
	}

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
        <section>
          <h2>Select your items:</h2>

          <div id="filtersContainer">
            <select name="sort" onChange={updateFoodFilters}>
              <option value="name">Name</option>
              <option value="calories">Calories ↑</option>
              <option value="sugar">Sugar ↑</option>
              <option value="protein">Protein ↓</option>
            </select>

            <input type="checkbox" id="inSeasonCheckbox" name="inSeason" onChange={updateFoodFilters} />
            <label htmlFor="inSeason">In Season</label>

            <input type="checkbox" id="fruitCheckbox" name="fruit" onChange={updateFoodFilters} />
            <label htmlFor="fruit">Fruit</label>

            <input type="checkbox" id="vegetablesCheckbox" name="vegetable" onChange={updateFoodFilters} />
            <label htmlFor="vegetable">Vegetables</label>
          </div>

          <FoodList food={food} getMonth={getMonth} />
        </section>

        <GroceryMarkup hidden={isGroceryListHidden} handleClick={toggleGroceryList} inputRef={inputRef} />
        <button id="groceryListButton" onClick={toggleGroceryList} aria-label="Open Grocery List"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" /></svg></button>
      </main>
    </div>
  )
}

export default App