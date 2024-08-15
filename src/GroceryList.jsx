import React from 'react'
//import GroceryListItem from './GroceryListItem'

let nextId = 0;

export default function GroceryList() {
    const [groceryListItem, setGroceryListItem] = React.useState('');
    const [groceryList, setGroceryList] = React.useState(() =>
        JSON.parse(localStorage.getItem('groceryList')) || [{id: nextId++, checked: false, text: ''}]
    )

    function updateGroceryListItem(event) {
        setGroceryListItem(event.target.value)
    }

    React.useEffect(() => {
        console.log(groceryList)
        //localStorage.setItem('groceryList', groceryList)
    }, [groceryList])

    function updateGroceryList(event, id) {
        console.log(nextId)
        if (event.key === 'Enter') {
            console.log('enter')
            setGroceryList(prevGroceryList => [...prevGroceryList, {id: nextId++, checked: false, text: event.target.value}])
        } else {
            setGroceryList(prevGroceryList => prevGroceryList.map(prevItem => {
                if (prevItem.id === id) {
                    console.log('test1')
                    return {...prevItem, text: event.target.value}
                } else {
                    console.log('test3')
                    return prevItem
                }
            }))
        }
    }

    function addNewGroceryListItem() {
        setGroceryList(prevGroceryList => [...prevGroceryList, {id: nextId++, checked: false, text: event.target.value}])
    }

    /* const groceryListItems = groceryList.map((item) =>
        <GroceryListItem key={item.id} {...item} onChange={updateGroceryList} />
    ) */

    return (
        <div>
            {groceryList.map(item => (
                <div key={item.id}>
                    <input type="checkbox" />
                    <input type="text"
                        onKeyUp={(event) => updateGroceryList(event, item.id)}
                        /* onChange={(event) => updateGroceryList(event, item.id)} */
                        /* onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()} */ />
                </div>
            ))}
            {/*<input type="text" onChange={updateGroceryList} />*/}
        </div>
    )
}