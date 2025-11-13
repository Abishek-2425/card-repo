// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const searchBar = document.getElementById('search-bar');
    let allCardsData = [];
    let allCardElements = [];

    // Secret key for viewing private "met_at" field
    const SECRET_KEY = "supersecret123"; // <-- change this to your own secret phrase
    const urlParams = new URLSearchParams(window.location.search);
    const providedKey = urlParams.get("key");
    const showPrivate = providedKey === SECRET_KEY;

    // Fetch card data from the JSON file
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            // Updated JSON format now has: { "cards": [ ... ] }
            allCardsData = data.cards || [];
            displayCards(allCardsData);
        })
        .catch(error => {
            console.error('Error fetching card data:', error);
            cardGrid.innerHTML = "<p>Error loading cards. Please try again later.</p>";
        });

    /**
     * Creates and displays the card elements in the grid
     * @param {Array} cards - An array of card data objects
     */
    function displayCards(cards) {
        cardGrid.innerHTML = '';
        allCardElements = [];

        cards.forEach(card => {
            const cardElement = createCardElement(card);
            cardGrid.appendChild(cardElement);
            allCardElements.push(cardElement);
        });
    }

    /**
     * Creates the HTML for a single business card
     * @param {object} card - A single card data object
     * @returns {HTMLElement} - The card's DOM element
     */
    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('business-card');
        cardElement.dataset.name = `${card.full_name || ''} ${card.job_title || ''} ${card.company_name || ''}`.toLowerCase();

        const socials = card.socials || {};
        const socialLinks = `
            ${socials.linkedin ? `<a href="${socials.linkedin}" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>` : ''}
            ${socials.github ? `<a href="${socials.github}" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
            ${socials.dribbble ? `<a href="${socials.dribbble}" target="_blank" title="Dribbble"><i class="fa-brands fa-dribbble"></i></a>` : ''}
            ${socials.twitter ? `<a href="${socials.twitter}" target="_blank" title="Twitter"><i class="fa-brands fa-twitter"></i></a>` : ''}
        `;

        const noteHTML = card.note ? `<p class="note"><strong>Note:</strong> ${card.note}</p>` : '';
        const metAtHTML = showPrivate && card.met_at
            ? `<p class="met-at" style="color: #888;"><em>Met at: ${card.met_at}</em></p>`
            : '';

        cardElement.innerHTML = `
            <div class="card-header">
                <img src="${card.image_url || 'https://i.pravatar.cc/150'}" alt="${card.full_name || 'Profile'}">
                <h3>${card.full_name || 'Unnamed'}</h3>
                <p>${card.job_title || ''}</p>
            </div>

            <div class="card-body">
                <div class="contact-info">
                    ${card.company_name ? `<p><i class="fa-solid fa-building"></i> ${card.company_name}</p>` : ''}
                    ${card.email ? `<p><i class="fa-solid fa-envelope"></i> <a href="mailto:${card.email}">${card.email}</a></p>` : ''}
                    ${card.phone_number ? `<p><i class="fa-solid fa-phone"></i> ${card.phone_number}</p>` : ''}
                    ${card.website ? `<p><i class="fa-solid fa-globe"></i> <a href="${card.website}" target="_blank">${card.website}</a></p>` : ''}
                    ${noteHTML}
                    ${metAtHTML}
                </div>
            </div>

            <div class="card-footer">
                <div class="social-links">
                    ${socialLinks}
                </div>
            </div>
        `;

        return cardElement;
    }

    /**
     * Filters the displayed cards based on the search input
     */
    function filterCards() {
        const searchTerm = searchBar.value.toLowerCase();
        allCardElements.forEach(cardElement => {
            const cardText = cardElement.dataset.name;
            const isMatch = cardText.includes(searchTerm);
            cardElement.classList.toggle('hide', !isMatch);
        });
    }

    // Add event listener to the search bar
    searchBar.addEventListener('input', filterCards);
});
