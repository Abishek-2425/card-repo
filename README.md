# Cardex - Business Card Repository

A clean, responsive, and searchable static website to display a personal collection of business cards. Built with pure HTML, CSS, and JavaScript, and hosted for free on GitHub Pages.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Site-00aaff?style=for-the-badge&logo=github)](https://abishek-2425.github.io/card-repo/)

## 📸 Live Demo & Screenshot

You can view the live, deployed version here:
**[https://abishek-2425.github.io/card-repo/](https://abishek-2425.github.io/card-repo/)**

*(Replace this text with a screenshot of your site!)*
![Screenshot of the Cardex website]

## ✨ Features

* **Modern Dark UI:** A sleek, dark-mode design that's easy on the eyes.
* **Live Search:** Instantly filter cards by name, job title, or company.
* **Responsive Grid:** Looks great on all devices, from mobile phones to desktop monitors.
* **Static & Fast:** No database or backend. Loads instantly from anywhere.
* **Zero-Cost Hosting:** Runs entirely on the free GitHub Pages service.
* **Easy to Manage:** The entire collection is managed by editing a single `cards.json` file.

## 🛠️ Built With

* **HTML5:** Semantic structure for the content.
* **CSS3:** Custom styling, (Grid/Flexbox) for layout, and hover animations.
* **JavaScript (ES6+):**
    * Fetches data from `cards.json`.
    * Dynamically generates card HTML.
    * Powers the live search/filter logic.
* **Font Awesome:** For all icons.
* **Google Fonts:** For the 'Inter' typeface.

## 🗂️ How to Manage Your Cards (The "Admin")

This project is designed so that **only you** can manage the content. Your "admin panel" is the `cards.json` file in this repository.

The workflow is simple:
1.  **Edit Locally:** Open the `cards.json` file on your computer and make changes.
2.  **Push to GitHub:** Commit and push the file to your `main` branch.
3.  **Go Live:** GitHub Pages automatically rebuilds your site with the new data.

### To Add a New Card:

1.  Open the `cards.json` file.
2.  Copy an existing card's JSON object (from `{` to `}`).
3.  Add a comma ` , ` after the last card in the list.
4.  Paste the new card object after the comma.
5.  Edit the details for your new card.

### To Edit or Delete a Card:

1.  Open the `cards.json` file.
2.  Find the card you want to change or remove.
3.  Edit the text values or delete the entire object (from `{` to `}`).
    * *If you delete a card, make sure you don't leave a trailing comma ` , ` on the new last card in the list.*

### Deploying Your Changes:

After saving `cards.json`, run these commands in your terminal:

```bash
# Add the changed file
git add cards.json

# Create a commit message
git commit -m "Updated my card collection"

# Push the changes to GitHub
git push