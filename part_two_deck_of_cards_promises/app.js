let deckId;

function createCardElement(card) {
    const cardElement = document.createElement('p');
    cardElement.textContent = `${card.value} of ${card.suit}`;
    return cardElement;
}

function drawCard() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            if (data.cards.length === 0) {
                alert('No more cards in the deck!');
                return;
            }
            const card = data.cards[0];
            const cardsContainer = document.getElementById('cards-container');
            cardsContainer.appendChild(createCardElement(card));
        })
        .catch(error => console.error('Error drawing card:', error));
}

document.getElementById('draw-card').addEventListener('click', drawCard);

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Response from deck creation:', response);
        return response.json();
    })
    .then(data => {
        console.log('Deck created:', data); // Log the deck data
        deckId = data.deck_id;
        if (!deckId) {
            throw new Error('Deck ID is undefined');
        }
        const drawCardButton = document.getElementById('draw-card');
        drawCardButton.disabled = false; // Enable the button
        console.log('Draw card button enabled');
    })
    .catch(error => console.error('Error creating new deck:', error));