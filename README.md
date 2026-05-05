# Code Reviewer

Code Reviewer is a full-stack web app that turns pasted code into structured, developer-friendly feedback. The UI delivers a focused, editor-like experience with line numbers, a live line counter, and one-click copy for the review output. A Node/Express API calls the Google Gemini model to generate reviews that highlight bugs, performance concerns, security risks, and testability tips.

## Features
- Split-pane editor and analysis layout
- Live line count while typing
- Loading and error states for clear feedback
- Copy-to-clipboard for review output
- Backend validation and AI review generation

## Tech Stack
- React + Vite
- Axios
- Node.js + Express
- Google Gemini API
- Custom CSS dark theme

## Project Structure
```
Code_Reviewer/
	Backend/
		server.js
		src/
			app.js
			controllers/
			routes/
			services/
	Frontend/
		index.html
		src/
			App.jsx
			App.css
```

## Getting Started

### 1) Backend
```
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```
GOOGLE_GEMINI_KEY=your_api_key_here
```

Run the server:
```
node server.js
```

### 2) Frontend
```
cd Frontend
npm install
npm run dev
```

## Usage
1. Paste code into the left editor.
2. Click **Review Code**.
3. Read the AI feedback on the right and copy it if needed.

## Notes
- This project is intended for learning and rapid iteration, not as a replacement for human code review.
