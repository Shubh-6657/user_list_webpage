# User Directory Web App

A clean, responsive user directory that fetches and displays user data from JSONPlaceholder API.

![Screenshot](https://i.imgur.com/JQ8W5cM.png)

## Features

- Fetches user data from public API
- Responsive grid layout (1-3 columns depending on screen size)
- Smooth card animations
- User details popup with additional information
- Reload functionality without page refresh
- Error handling with user-friendly messages
- Clean, modern UI with Tailwind CSS

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript (ES6)
- jQuery (for AJAX and DOM manipulation)
- JSONPlaceholder API

## Installation & Usage

No installation needed! This is a pure frontend app that runs directly in the browser.

1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. That's it! The app will automatically load user data

## How It Works

1. On page load, the app makes an AJAX request to:
https://jsonplaceholder.typicode.com/users

2. While loading, shows a spinner animation
3. Displays users in responsive cards with:
- Name
- Email
- Phone
- Website
4. Click any card to see expanded details in a popup
5. Use the "Refresh List" button to reload data

## Code Structure

user-directory/
├── index.html # Main HTML file
├── styles.css # Custom CSS styles
├── main.js # All JavaScript functionality
└── README.md # This file


## Customization

Want to tweak the app? Here's what you can modify:

- **styles.css**: Adjust animations, colors, or spacing
- **main.js**: 
  - Change the API endpoint (line 25)
  - Modify the data display format
  - Adjust animation timings (line 80)
- **index.html**: 
  - Update page title/header
  - Add additional UI elements

## Browser Support

The app works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This app uses a free public API (JSONPlaceholder) which may have rate limits. For production use, consider setting up your own backend.