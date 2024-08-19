import React from 'react'

export default function FoodList(props) {
    const [basket, setBasket] = React.useState([])

    function FoodListItem(props) {
        return (
            <button className={basket.includes(props.name) ? 'selected' : ''} key={props.nameKey} hidden={props.hidden ? props.hidden : false} onClick={() => props.handleFoodClick(props.name)}>
                <h3>{props.name}</h3>
                <ul>
                    <li>Calories: <span>{props.nutritions.calories}</span></li>
                    <li>Sugar: <span>{props.nutritions.sugar}</span></li>
                    <li>Protein: <span>{props.nutritions.protein}</span></li>
                    <li>Season: <span>{props.getMonth(props.season.start)} - {props.getMonth(props.season.end)}</span></li>
                </ul>
            </button>
        )
    }

    function handleFoodClick(name) {
        if (basket.includes(name)) {
            setBasket(prevBasket => prevBasket.filter((itemName) => itemName !== name));
        } else {
            setBasket(prevBasket => [...prevBasket, name]);
        }
    }
    //console.log(basket)

    function addItemsToList() {
        let html = '';
        for (let foodName of basket) {
            html += `<li role="checkbox" aria-checked="false">${foodName}</li>`;
        }
        document.getElementById('groceryList').innerHTML += html;
        setBasket([]);
    }

    return (
        <div>
            <button id="addToGroceryListButton" onClick={addItemsToList}>Add Items to Grocery List</button>
            <div className="food-list">
                {Object.entries(props.food).map(([foodKey, foodItem]) => <FoodListItem key={foodKey} foodKey={foodItem.nameKey} {...foodItem} handleFoodClick={handleFoodClick} getMonth={props.getMonth} />)}
            </div>
        </div>
    )
}