import React from 'react'
import fruitData from './data/fruits.json'

function getMonth(month) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1];
}

export default function FoodListItem(props) {
    return (
        <div className="food-list">
            {Object.entries(fruitData).map(([fruitKey, fruit]) => <FoodListItem key={fruitKey} foodKey={fruitKey} {...fruit} />)}
        </div>
    )
}