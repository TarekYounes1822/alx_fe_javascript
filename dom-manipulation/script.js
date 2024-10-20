document.addEventListener('DOMContentLoaded', () => {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quoteDisplay = document.getElementById('quote-display');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const newQuoteText = document.getElementById('new-quote-text');
    const newQuoteCategory = document.getElementById('new-quote-category');
    const addQuoteBtn = document.getElementById('add-quote-btn');

    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.innerHTML = 'No quotes available.';
            return;
        }
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
            saveQuotes();
            showRandomQuote();
        } else {
            alert('Please enter both text and category.');
        }
    }

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    newQuoteBtn.addEventListener('click', showRandomQuote);
    addQuoteBtn.addEventListener('click', addQuote);

    document.getElementById('export-quote-btn').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('importfile').addEventListener('change', importFromJsonFile);

    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
            showRandomQuote();
        };
        fileReader.readAsText(event.target.files[0]);
    }

    showRandomQuote();  // Display a random quote when the page loads
    createAddQuoteForm();  // Ensure the add quote form is created

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
});
