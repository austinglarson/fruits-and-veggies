import React from 'react'
//import GroceryListItem from './GroceryListItem'

let nextId = 0;

export default function GroceryList() {
    const [groceryList, setGroceryList] = React.useState(() =>
        JSON.parse(localStorage.getItem('groceryList')) || [{id: nextId++, checked: false, delete: false, text: '',}]
    )

    React.useEffect(() => {
        console.log(groceryList)
        //localStorage.setItem('groceryList', groceryList)
    }, [groceryList])

    function updateGroceryList(event, id) {
        //console.log(nextId)
        const itemValue = event.target.value;

        if (event.key === 'Enter') {
            console.log('enter')
            setGroceryList(prevGroceryList => [...prevGroceryList, {id: nextId++, checked: false, delete: false, text: itemValue}])
        } else if (itemValue === '' && event.key === 'Backspace') {
            setGroceryList(prevGroceryList => {
                const newGroceryList = []
                for (let item of prevGroceryList) {
                    if (item.id === id && item.delete) {
                        newGroceryList.filter((item) => item.id !== id)
                    } else if (item.id === id) {
                        item.delete = true
                        newGroceryList.push(item)
                    } else {
                        newGroceryList.push(item)
                    }
                }
                return newGroceryList
            })
        } else {
            setGroceryList(prevGroceryList => prevGroceryList.map(prevItem =>
                prevItem.id === id 
                ? {...prevItem, delete: false, text: itemValue}
                : prevItem
            ))
        }
    }

    function addNewGroceryListItem() {
        setGroceryList(prevGroceryList => [...prevGroceryList, {id: nextId++, checked: false, text: event.target.value}])
    }

    function toggleGroceryListItemCheck(event, id) {
        console.log(event.target.checked)
        setGroceryList(prevGroceryList => prevGroceryList.map(prevItem =>
            prevItem.id === id 
            ? {...prevItem, checked: event.target.checked}
            : prevItem
        ))
    }

    /* const groceryListItems = groceryList.map((item) =>
        <GroceryListItem key={item.id} {...item} onChange={updateGroceryList} />
    ) */

    return (
        <div className='grocery-list'>
            {groceryList.map(item => (
                <div key={item.id} className={item.checked ? 'checked' : ''}>
                    <input type="checkbox" checked={item.checked} onChange={(event) => toggleGroceryListItemCheck(event, item.id)} />
                    <input type="text"
                        onKeyUp={(event) => updateGroceryList(event, item.id)}
                        autoFocus
                        /* onChange={(event) => updateGroceryList(event, item.id)} */
                        /* onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()} */ />
                </div>
            ))}
            {/*<input type="text" onChange={updateGroceryList} />*/}
        </div>
    )
}