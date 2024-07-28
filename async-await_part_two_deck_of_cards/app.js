let deckId = null;

async function initializeDeck() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
    const data = await response.json();
    deckId = data.deck_id;
    document.getElementById('draw-card').disabled = false;
}

async function drawCard() {
    if (!deckId) return;

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    const card = data.cards[0];

    const cardContainer = document.getElementById('cards-container');
    const cardElement = document.createElement('div');
    cardElement.textContent = `${card.value} of ${card.suit}`;
    cardContainer.appendChild(cardElement);

    if (data.remaining === 0) {
        document.getElementById('draw-card').disabled = true;
    }
}

document.getElementById('draw-card').addEventListener('click', drawCard);

initializeDeck();