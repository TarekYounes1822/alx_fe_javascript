document.addEventListener('DOMContentLoaded', () => {
    let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quoteDisplay = document.getElementById('quote-display');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const newQuoteText = document.getElementById('new-quote-text');
    const newQuoteCategory = document.getElementById('new-quote-category');
    const addQuoteBtn = document.getElementById('add-quote-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    const syncBtn = document.getElementById('sync-btn');

    function showRandomQuote() {
        const filteredQuotes = quotes.filter(quote =>
            categoryFilter.value === 'all' || quote.category === categoryFilter.value
        );
        if (filteredQuotes.length === 0) {
            quoteDisplay.innerHTML = 'No quotes available.';
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
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
            populateCategories();
            showRandomQuote();
        } else {
            alert('Please enter both text and category.');
        }
    }

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function filterQuotes() {
        showRandomQuote();
        localStorage.setItem('selectedCategory', categoryFilter.value);
    }

    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    async function fetchQuotesFromServer() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const serverQuotes = await response.json();

            const transformedQuotes = serverQuotes.map(post => ({
                text: post.title,
                category: 'Server'
            }));

            return transformedQuotes;
        } catch (error) {
            console.error('Error fetching quotes from server:', error);
            return [];
        }
    }

    async function syncQuotes() {
        try {
            const serverQuotes = await fetchQuotesFromServer();

            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quotes)
            });

            quotes = [...serverQuotes, ...quotes.filter(localQuote =>
                !serverQuotes.some(serverQuote => serverQuote.text === localQuote.text))];
            saveQuotes();
            alert('Quotes synced with server!');
            showRandomQuote();
        } catch (error) {
            console.error('Error syncing with server:', error);
            alert('Failed to sync with server.');
        }
    }

    newQuoteBtn.addEventListener('click', showRandomQuote);
    addQuoteBtn.addEventListener('click', addQuote);
    categoryFilter.addEventListener('change', filterQuotes);
    syncBtn.addEventListener('click', syncQuotes);

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
            populateCategories();
            showRandomQuote();
        };
        fileReader.readAsText(event.target.files[0]);
    }

    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = selectedCategory;
    populateCategories();
    showRandomQuote();
    createAddQuoteForm();

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

    // Periodically check for new quotes from the server every 5 minutes (300,000 ms)
    setInterval(syncQuotes, 300000);
});
