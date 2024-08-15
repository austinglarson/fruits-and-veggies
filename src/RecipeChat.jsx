import React from 'react'

export default function RecipeChat() {
    const [chatResponse, setChatResponse] = React.useState('')

    const message = `Could you please give me recipe ideas incorporating apples? Please send the message as a list.`;

    React.useEffect(() => {
        console.log('Fetching data...');
        try {
            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }],
                })
            }).then(res => res.json()).then(data => 
                console.log(data)
            )
        } catch (error) {
        console.error('Error fetching data: ', error);
        }
    }, [])
}