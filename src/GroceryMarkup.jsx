import React from 'react'

export default function GroceryMarkup(props) {
    function updateGroceryMarkup(event) {
        const list = event.target;

        // Create new list item when pressing Enter
        if (event.key === 'Enter') {
            event.preventDefault();

            let li = document.createElement('li');
            li.setAttribute('role', 'checkbox');
            li.setAttribute('aria-checked', false);
            list.insertAdjacentElement('beforeEnd', li);

            // Focus the new list item
            window.getSelection().selectAllChildren(li);
            window.getSelection().collapseToEnd();
        }

        localStorage.setItem('groceryList', JSON.stringify(event.target.innerHTML));
    }

    // Prevents the Enter key down event from creating a div on a new line
    function preventEnterKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
        // Prevents backspacing the first list item
        if (event.key === 'Backspace' && event.target.childElementCount <= 1 && event.target.firstElementChild.textContent.length === 0) {
            event.preventDefault();
        }
    }

    function checkListItem(event) {
        // Check if event click was offset to the left of the li element for checkbox
        console.log(event.nativeEvent.offsetX);
        if (!event.target.getAttribute('aria-checked') || event.nativeEvent.offsetX >= 0) return;
        event.target.setAttribute('aria-checked', (event.target.getAttribute('aria-checked') === 'true' ? 'false' : 'true'))
        localStorage.setItem('groceryList', JSON.stringify(event.target.parentElement.innerHTML));
    }

    // Parses the HTML string into an array of JSX elements
    function parseHTML(htmlString) {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        const elements = template.content.childNodes;

        // Convert each HTML element into JSX
        return Array.from(elements).map((element, index) => (
            <li key={index} role={element.getAttribute('role')} aria-checked={element.getAttribute('aria-checked')} dangerouslySetInnerHTML={{ __html: element.innerHTML }} />
        ));
    }

    // Get grocery list from local storage
    let groceryList = <li role='checkbox' aria-checked='false'></li>;
    if (localStorage.getItem('groceryList')) {
        groceryList = parseHTML(JSON.parse(localStorage.getItem('groceryList')));
    }

    return (
        <div className="dialog" hidden={props.hidden} onClick={props.handleClick}>
            <div>
                <div className="dialog-title">
                    <span>Grocery List</span>
                    <button className="close-dialog-btn" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><line x1="16" x2="16" y2="32"/><line y1="16" x2="32" y2="16"/></svg></button>
                </div>
                <ul id="groceryList" className="grocery-list" aria-label="editable markdown" contentEditable="true" role="textbox" 
                onKeyDown={preventEnterKeyDown} onKeyUp={updateGroceryMarkup} onClick={checkListItem} ref={props.inputRef}>{groceryList}</ul>
            </div>
        </div>
    )
}