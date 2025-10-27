## 📚 Book Finder

Find books fast by searching titles. Clean UI, zero config, powered by the free Open Library API.

### Why you’ll like it
- Quick title search with instant feedback (loading and no-results states)
- See cover, title, authors, and jump to the Open Library page
- Simple, responsive layout that looks good on mobile and desktop
- No API keys or sign-ups required

---

## Getting started

Prerequisites
- Node.js 18+ and npm

Install and run (Windows PowerShell or any shell)
```bash
npm install
npm start


This starts the dev server on http://localhost:3000 and auto-reloads on changes.

---

## How it works
- The app searches Open Library’s search endpoint: https://openlibrary.org/search.json?title=<query>
- It displays up to 20 results from data.docs with:
	- Title: doc.title
	- Authors: doc.author_name[] (if present)
	- Cover: covers API using doc.cover_i (fallback image if missing)
	- Details link: https://openlibrary.org{doc.key}

No API key is needed. Network errors or empty results show friendly messages.

---

## Features
- Title search with debounced form submit
- Loading and error states
- Responsive grid of book cards
- Accessible buttons, links, and alt text for covers

---

## Tech stack
- React (Create React App tooling)
- Plain CSS (no utility framework)
- Open Library Search and Covers APIs

---

## Available scripts
- npm start – Run the app in development
- npm test – Launch test runner
- npm run build – Build for production
- npm run eject – Eject CRA configuration (irreversible)

---

## Project structure
```
book-finder/
	public/
		index.html          # HTML template
	src/
		pages/Home.jsx      # Page: search flow, state and data fetching
		components/
			SearchBar.jsx     # Search input and submit button
			BookList.jsx      # Responsive grid of results
			BookCard.jsx      # Individual book card with cover, meta, link
		App.jsx             # App shell
		style.css           # App styles
```

---

## Customization tips
- Styling: Tweak src/style.css for colors, spacing, or card layout
- Result limits: Change slice(0, 20) in src/pages/Home.jsx
- Search scope: Extend the query (e.g., author=, subject=) per Open Library docs

---

## Troubleshooting
- Port in use: Change PORT=3001 before npm start (PowerShell)
	```powershell
	setx PORT 3001; npm start
	```
- Blank results: Try a simpler title (Open Library search can be literal)
- Covers missing: Some entries don’t have cover_i; a placeholder is shown

---

## Acknowledgements
- Data and covers by Open Library (openlibrary.org)

If you plan to publish, consider adding a license (e.g., MIT) and a small privacy note.
