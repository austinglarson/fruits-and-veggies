import React from 'react'
import fruitData from './data/fruits.json'

function getMonth(month) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1];
}

function FoodListItem(props) {
    return (
        <button key={props.id} onClick={() => props.handleFoodClick(props.foodKey)}>
            <h3>{props.name}</h3>
            <ul>
                <li>Calories: <span>{props.nutritions.calories}</span></li>
                <li>Sugar: <span>{props.nutritions.sugar}</span></li>
                <li>Protein: <span>{props.nutritions.protein}</span></li>
                <li>Months: <span>{getMonth(props.season.start)} - {getMonth(props.season.end)}</span></li>
            </ul>
        </button>
    )
}

export default function FoodList() {
    const [basket, setBasket] = React.useState([])

    function handleFoodClick(key) {
        setBasket(prevBasket => [...prevBasket, key])
    }
    console.log(basket)

    return (
        <div className="food-list">
            {Object.entries(fruitData).map(([fruitKey, fruit]) => <FoodListItem key={fruitKey} foodKey={fruitKey} {...fruit} handleFoodClick={handleFoodClick} />)}
        </div>
    )
}