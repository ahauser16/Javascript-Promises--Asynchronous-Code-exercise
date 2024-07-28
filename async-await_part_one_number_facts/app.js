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
async function getFactAboutNumber(number) {
    try {
        const response = await fetch(`http://numbersapi.com/${number}?json`);
        const data = await response.json();
        console.log('Fact about 16:', data.text);
        displayFacts([data.text]);
    } catch (error) {
        console.error('Error fetching fact about 16:', error);
    }
}

// Task 2: Get data on multiple numbers in a single request
async function getFactsAboutMultipleNumbers(numbers) {
    try {
        const response = await fetch(`http://numbersapi.com/${numbers}?json`);
        const data = await response.json();
        const facts = Object.values(data).map(fact => fact);
        console.log('Facts about multiple numbers:', facts);
        displayFacts(facts);
    } catch (error) {
        console.error('Error fetching facts about multiple numbers:', error);
    }
}

// Task 3: Get 4 facts about the number 16
async function getMultipleFactsAboutNumber(number, count) {
    try {
        const factPromises = [];
        for (let i = 0; i < count; i++) {
            factPromises.push(fetch(`http://numbersapi.com/${number}?json`).then(response => response.json()));
        }
        const results = await Promise.all(factPromises);
        const facts = results.map(result => result.text);
        console.log(`4 facts about ${number}:`, facts);
        displayFacts(facts);
    } catch (error) {
        console.error(`Error fetching ${count} facts about ${number}:`, error);
    }
}

// Example usage
getFactAboutNumber(16);
getFactsAboutMultipleNumbers('1,2,3,4,5');
getMultipleFactsAboutNumber(16, 4);