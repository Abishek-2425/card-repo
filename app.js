// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const cardGrid = document.getElementById('card-grid');
    const searchBar = document.getElementById('search-bar');
    let allCardsData = []; // To store the fetched card data
    let allCardElements = []; // To store the created card DOM elements

    // Fetch card data from the JSON file
    fetch('cards.json')
        .then(response => response.json())
        .then(cards => {
            allCardsData = cards;
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
        cardGrid.innerHTML = ''; // Clear existing cards
        allCardElements = []; // Clear the elements array

        cards.forEach(card => {
            const cardElement = createCardElement(card);
            cardGrid.appendChild(cardElement);
            allCardElements.push(cardElement); // Store the element for filtering
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
        cardElement.dataset.name = `${card.full_name} ${card.job_title} ${card.company_name}`.toLowerCase(); // For search

        // Helper to check for social links and build icons
        const socials = card.socials || {};
        const socialLinks = `
            ${socials.linkedin ? `<a href="${socials.linkedin}" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>` : ''}
            ${socials.github ? `<a href="${socials.github}" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
            ${socials.dribbble ? `<a href="${socials.dribbble}" target="_blank" title="Dribbble"><i class="fa-brands fa-dribbble"></i></a>` : ''}
            ${socials.twitter ? `<a href="${socials.twitter}" target="_blank" title="Twitter"><i class="fa-brands fa-twitter"></i></a>` : ''}
        `;

        cardElement.innerHTML = `
            <div class="card-header">
                <img src="${card.image_url || 'https://i.pravatar.cc/150'}" alt="${card.full_name}">
                <h3>${card.full_name}</h3>
                <p>${card.job_title}</p>
            </div>
            
            <div class="card-body">
                <div class="contact-info">
                    <p><i class="fa-solid fa-building"></i> ${card.company_name}</p>
                    <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${card.email}">${card.email}</a></p>
                    <p><i class="fa-solid fa-phone"></i> ${card.phone_number}</p>
                    <p><i class="fa-solid fa-globe"></i> <a href="${card.website}" target="_blank">${card.website}</a></p>
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
            const cardText = cardElement.dataset.name; // Use the pre-compiled data-name
            const isMatch = cardText.includes(searchTerm);
            cardElement.classList.toggle('hide', !isMatch); // Add 'hide' class if it's not a match
        });
    }

    // Add event listener to the search bar
    searchBar.addEventListener('input', filterCards);

});