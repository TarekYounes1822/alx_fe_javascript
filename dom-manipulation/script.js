document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
        { text: "Your time is limited, don't waste it living someone else's life.", category: "Inspiration" }
    ];

    const quoteDisplay = document.getElementById('quote-display');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const newQuoteText = document.getElementById('new-quote-text');
    const newQuoteCategory = document.getElementById('new-quote-category');
    const addQuoteBtn = document.getElementById('add-quote-btn');

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
    }

    function addNewQuote() {
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();
        if (text && category) {
            quotes.push({ text, category });
            newQuoteText.value = '';
            newQuoteCategory.value = '';
            alert('New quote added!');
        } else {
            alert('Please enter both text and category.');
        }
    }

    newQuoteBtn.addEventListener('click', showRandomQuote);
    addQuoteBtn.addEventListener('click', addNewQuote);
});
