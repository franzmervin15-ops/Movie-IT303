# MCO1: App Interface Prototype

## Project Overview
MovieExplorer is a simple, offline movie browsing prototype built with Expo and React Native. It uses a small collection of hardcoded movie data and does not connect to an API or save data after the app closes.

## Features
- Browse a collection of 12 movies
- Search titles and filter by genre
- Open a movie details view
- Add and remove movies from an in-memory watchlist
- Use the app without an internet connection

## Run the App
From this project folder:

```bash
npm install
npx expo start
```

Press `w` in the Expo terminal to open the web version, or scan the QR code with Expo Go.

## How It Works
The movie list is the `movies` array in `src/data/movies.js`. Search and genre filters use JavaScript `filter()`. The screen in `src/app/index.js` uses React `useState` to track the current view, search text, selected genre, and saved movie IDs.

The watchlist only lasts while the app is open. Restarting the app resets it. That is intentional for this interface prototype; there is no API, account, or device storage.

## Concepts Demonstrated
- JavaScript arrays and objects for movie data
- Variables and functions for filtering and button actions
- `useState` for changing what appears on screen
- JSX with `View`, `Text`, `TextInput`, `ScrollView`, and `Pressable`
- Flexbox for arranging the movie collection and controls
- Conditional rendering for details, empty states, and saved titles

MovieExplorer - at index.js - Line 46

BSIT3-A - at index.js - Line 47

A SMALL COLLECTION, PICKED FOR TONIGHT - at index.js - Line 74

Find your next favorite story - at index.js - Line 75

Twelve films. No sign-in, no internet, just something good to watch. - at index.js - Line 78

Search this collection - at index.js - Line 89

THE COLLECTION - at index.js - Line 117

films - index.js Line 79

0 films saved for later. - index.js Line 79

Sample movies - at data/movie.js can be called object array
All, Sci-Fi, Drama, Animation, Adventure, Comedy, Thriller, Mystery - at index.js - Line 106

DISCOVER - at index.js - Line 165

WATCHLIST - at index.js - Line 170

+ SAVE - index.js Line 139

YOUR PERSONAL SHORTLIST 0 index.js Line 74

Keep the good ones

close by. - index.js - Line 75

SAVED FILMS - index.js Line 117

Nothing saved yet - index.js Line 147

Visit Discover and save a film to see it here. - index.js Line 149

EXPLORE THE COLLECTION  > 0 index.js Line 153