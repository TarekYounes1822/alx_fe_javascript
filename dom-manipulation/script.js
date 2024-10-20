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

    function createAddQuoteForm() {
        const form = document.createElement('div');
        form.id = 'add-quote-form';

        const heading = document.createElement('h2');
        heading.textContent = 'Add a New Quote';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.id = 'new-quote-text';
        textInput.placeholder = 'Enter quote text';

        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.id = 'new-quote-category';
        categoryInput.placeholder = 'Enter quote category';

        const addButton = document.createElement('button');
        addButton.id = 'add-quote-btn';
        addButton.textContent = 'Add Quote';

        form.appendChild(heading);
        form.appendChild(textInput);
        form.appendChild(categoryInput);
        form.appendChild(addButton);

        document.body.appendChild(form);

        addButton.addEventListener('click', addQuote);
    }

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
    }

    function addQuote() {
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();
        if (text && category) {
            quotes.push({ text, category });
            newQuoteText.value = '';
            newQuoteCategory.value = '';
            alert('New quote added!');
            showRandomQuote(); // Optional: Display the newly added quote immediately
        } else {
            alert('Please enter both text and category.');
        }
    }

    newQuoteBtn.addEventListener('click', showRandomQuote);
    showRandomQuote();  // Display a random quote when the page loads
    createAddQuoteForm();  // Ensure the add quote form is created
});
