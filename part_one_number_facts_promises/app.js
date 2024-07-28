// Function to create an element for displaying facts
function createFactElement(fact) {
    const factElement = document.createElement('p');
    factElement.textContent = fact;
    return factElement;
}

// Function to display facts on the page
function displayFacts(facts) {
    const factsContainer = document.getElementById('number-facts');
    factsContainer.innerHTML = ''; // Clear previous facts
    facts.forEach(fact => {
        factsContainer.appendChild(createFactElement(fact));
    });
}

// Task 1: Get a fact about the number 16
fetch('http://numbersapi.com/16?json')
    .then(response => response.json())
    .then(data => {
        console.log('Fact about 16:', data.text);
        displayFacts([data.text]);
    })
    .catch(error => console.error('Error fetching fact about 16:', error));

// Task 2: Get data on multiple numbers in a single request
fetch('http://numbersapi.com/1,2,3,4,5?json')
    .then(response => response.json())
    .then(data => {
        const facts = Object.values(data).map(fact => fact);
        console.log('Facts about multiple numbers:', facts);
        displayFacts(facts);
    })
    .catch(error => console.error('Error fetching facts about multiple numbers:', error));

// Task 3: Get 4 facts about the number 16
const factPromises = [];
for (let i = 0; i < 4; i++) {
    factPromises.push(fetch('http://numbersapi.com/16?json').then(response => response.json()));
}

Promise.all(factPromises)
    .then(results => {
        const facts = results.map(result => result.text);
        console.log('4 facts about 16:', facts);
        displayFacts(facts);
    })
    .catch(error => console.error('Error fetching 4 facts about 16:', error));