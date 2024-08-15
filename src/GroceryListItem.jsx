import React from 'react'

export default function GroceryListItem(props) {
    return (
        <div>
            <input type="checkbox" />
            <input type="text" value={props.text} onChange={props.onChange} />
        </div>
    )
}