// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

const foods = [
    { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop' },
    { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop' },
    { name: 'Taco', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=200&auto=format&fit=crop' },
    { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=200&auto=format&fit=crop' },
    { name: 'Pasta', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=200&auto=format&fit=crop' },
    { name: 'Fried Chicken', image: 'https://images.unsplash.com/photo-1562967914-608f134c609c?q=80&w=200&auto=format&fit=crop' },
    { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=200&auto=format&fit=crop' },
    { name: 'Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=200&auto=format&fit=crop' },
];

let currentRoundFoods = [...foods];
let winners = [];
let round = 1;
let currentMatchup = 0;

const roundTitle = document.getElementById('round-title');
const food1Container = document.getElementById('food-1');
const food2Container = document.getElementById('food-2');
const food1Image = food1Container.querySelector('img');
const food1Name = food1Container.querySelector('h3');
const food2Image = food2Container.querySelector('img');
const food2Name = food2Container.querySelector('h3');
const nextRoundBtn = document.getElementById('next-round-btn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayMatchup() {
    if (currentMatchup * 2 >= currentRoundFoods.length) {
        // End of the round
        if (currentRoundFoods.length === 1) {
            roundTitle.textContent = 'Winner!';
            food1Container.style.display = 'none';
            food2Container.style.display = 'none';
            nextRoundBtn.style.display = 'none';

            const winner = currentRoundFoods[0];
            const winnerElement = document.createElement('div');
            winnerElement.classList.add('food-item');
            winnerElement.innerHTML = `<img src="${winner.image}" alt="${winner.name}"><h3>${winner.name} is the champion!</h3>`;
            document.querySelector('main').insertBefore(winnerElement, nextRoundBtn);

        } else {
            nextRoundBtn.style.display = 'block';
        }
        return;
    }

    const food1 = currentRoundFoods[currentMatchup * 2];
    const food2 = currentRoundFoods[currentMatchup * 2 + 1];

    food1Image.src = food1.image;
    food1Name.textContent = food1.name;
    food1Image.alt = food1.name;

    food2Image.src = food2.image;
    food2Name.textContent = food2.name;
    food2Image.alt = food2.name;
}

function selectFood(selectedFoodIndex) {
    const winner = currentRoundFoods[currentMatchup * 2 + selectedFoodIndex];
    winners.push(winner);
    currentMatchup++;
    displayMatchup();
}

food1Container.addEventListener('click', () => selectFood(0));
food2Container.addEventListener('click', () => selectFood(1));

nextRoundBtn.addEventListener('click', () => {
    round++;
    currentRoundFoods = [...winners];
    winners = [];
    currentMatchup = 0;
    roundTitle.textContent = `Round ${round}`;
    nextRoundBtn.style.display = 'none';
    if (currentRoundFoods.length % 2 !== 0 && currentRoundFoods.length > 1){
        const luckyWinner = currentRoundFoods.pop();
        winners.push(luckyWinner);
    }
    if (currentRoundFoods.length === 1) {
        displayMatchup();
    } else {
        shuffle(currentRoundFoods);
        displayMatchup();
    }
});

// Start the game
shuffle(currentRoundFoods);
displayMatchup();