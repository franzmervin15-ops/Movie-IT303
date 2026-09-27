# Movie-IT303

## Source code overview

This project is a mobile app built with Expo and React Native. The main logic lives in the src folder, which is split into navigation files in src/app and reusable logic in src/services.

### 1) src/app/_layout.js
This is the root layout for the whole application. It uses Expo Router's Stack navigator to define how screens are organized. The file sets a dark background, a light status bar, and a global header style for screens.

The most important part is the Stack.Screen configuration:
- the tabs screen is hidden from the header
- the movie detail screen keeps the back navigation button and a cleaner header

This file acts like the app's main shell and gives every screen a consistent look.

### 2) src/app/(tabs)/_layout.js
This is the mobile tab bar. It creates the main navigation between the Search screen and the Watchlist screen.

The Tabs component is configured with:
- header hidden
- active tab color in cyan
- inactive tab color in gray
- dark background styling

This layout is the primary user navigation for the phone version of the app.

### 3) src/app/(tabs)/_layout.web.js
This file is the web-specific version of the tab layout. It uses Expo Router's web UI components instead of the mobile tab system.

The design includes a top navigation bar with:
- the app name
- tabs for Search and Watchlist
- a cyan underline to show the active page

This makes the same app work properly on a browser while keeping the visual style consistent.

### 4) src/app/(tabs)/index.js
This is the Search screen, which is likely the main screen users see first.

It keeps state for:
- the query typed into the search box
- the returned movie and TV results
- loading status while the API request is running
- any error message
- whether the user has searched yet
- the selected media filter: all, movie, or tv
- the saved IDs that exist in the local watchlist

The app uses useEffect to watch the query field. If the user clears the input, the app resets the search. If the user types text, it waits 400 milliseconds before calling the search function. This delay prevents too many API requests while the user is still typing.

The result list is filtered by media type before rendering. When a user taps a result card, the app navigates to the details page for that title. There is also a save button that toggles the item in and out of the watchlist.

This screen is the heart of the app because it connects search input, API data, and local storage.

### 5) src/app/(tabs)/watchlist.js
This screen displays the user's saved titles. It reads the watchlist from storage and shows each item as a card.

The important part is useFocusEffect, which reloads the list every time the screen becomes active. This ensures the watchlist updates when a title is saved or removed from another screen.

The list can show:
- movie cards
- TV cards
- empty state if nothing is saved
- remove button for each item

The screen also has a button that sends the user back to browse titles when the list is empty.

### 6) src/app/movie/[id].js
This file handles the detail screen for a single movie or TV series.

It loads the item using the route parameter id, then fetches its details from the iTunes service. It also checks whether that title is already saved to the watchlist.

The detail page shows:
- poster image
- title
- release year
- media type
- genre
- description
- watchlist toggle button

The toggleBookmark function adds the item to the watchlist if it is not there, or removes it if it already is. This makes the detail page the place where users can decide whether to save a title.

### 7) src/services/itunes.js
This file is the API layer for the app. It talks to Apple's iTunes Search API and prepares the data for the UI.

The file defines:
- BASE_URL for the iTunes API
- upsizeArtwork() to increase image size
- itunesFetch() to handle fetching and error responses
- cleanDescription() to remove HTML tags and clean text
- normalize() to turn raw API results into one consistent object shape
- searchTitles() to search for movies and TV shows
- getById() to fetch one item by ID

The raw API returns different fields for movies and TV seasons, so the app normalizes them into one shared structure. This keeps the rest of the app simple because screens do not have to check different result shapes.

This service is the bridge between the internet and the app's screens.

### 8) src/services/watchlist.js
This file manages the saved titles using AsyncStorage, which is a local storage system on mobile devices.

It contains functions like:
- getWatchlist() to read the saved list
- isBookmarked(id) to check if an item is already stored
- addToWatchlist(item) to insert a new title
- removeFromWatchlist(id) to delete a title

The watchlist is stored as a JSON array under a key name. This means the saved items remain available even after the app is closed and reopened.

### How the app works as a whole
The flow of the application is straightforward:

1. The user types a title in the Search screen.
2. The search screen calls the iTunes service.
3. The API returns movie and TV results.
4. The results are normalized and shown in cards.
5. The user taps a card to open the detail page.
6. The detail screen fetches more information and lets the user save it.
7. The watchlist is stored locally.
8. The Watchlist screen reads that storage and shows all saved items.

### Design style
The app uses a consistent dark theme with teal accents.

Common colors include:
- dark background: black/gray tones
- accent color: cyan/teal
- text: white and soft gray

This gives the app a modern streaming-style interface and makes the screens feel consistent.

### Main takeaway
The code is intentionally simple and well organized. Each file has a specific job:
- screens handle user interaction
- services handle API and storage logic
- the layout files handle global app navigation

This makes the project easy to understand and easy to extend.

---

This README is meant to help explain the structure and flow of the source code in the src folder so it is easier to follow the project as a whole.

## Beginner-friendly explanation

If you are new to this app, think of it like this:

- The app is a movie and TV search app.
- The user types a name like "Inception" or "The Office".
- The app sends that request to iTunes.
- The API returns results, and the app shows them as cards.
- If the user likes something, they can save it to a local watchlist.
- The detail screen gives more information about that title and lets the user manage the saved list.

### Why the code is split into src/app and src/services
This is a common React Native pattern:

- src/app contains screens and navigation pages
- src/services contains reusable logic that does not directly draw UI

This keeps the code organized. Instead of putting everything in one large file, the app is split into small pieces that each do one job.

### The most important files to understand first
If you want to learn the app quickly, read these files in this order:

1. src/services/itunes.js
   - This file explains how data is fetched from the internet.
2. src/app/(tabs)/index.js
   - This file shows how the search screen works.
3. src/services/watchlist.js
   - This file explains how saved movies are stored.
4. src/app/(tabs)/watchlist.js
   - This file shows how saved items are displayed.
5. src/app/movie/[id].js
   - This file explains the detail screen and watchlist toggle behavior.

By reading these files in order, you will understand the main flow of the app without getting lost in the styling details.

### What makes the app feel like a real app
The project uses a few patterns that are common in mobile apps:

- useState stores the current data in the screen
- useEffect runs code after the screen loads or after values change
- useFocusEffect refreshes data when the tab is opened again
- FlatList renders large lists efficiently
- AsyncStorage keeps saved data on the device
- Pressable makes buttons and clickable cards work nicely on mobile

These are all standard React Native patterns, and this project uses them in a simple and understandable way.

### The data flow in plain language
The app does this from start to finish:

1. User searches for a title.
2. The search screen sends the request to the API helper.
3. The API helper calls the iTunes endpoint.
4. The response is cleaned and normalized.
5. The screen displays the results.
6. User taps a title.
7. The detail screen fetches that one item.
8. User adds or removes it from the watchlist.
9. The watchlist is saved to local storage.
10. The watchlist page shows everything saved.

This pattern is easy to follow and is a good example of a small but complete app.

### Summary
The app is built to be simple:

- search for titles
- view details
- save favorites
- browse the saved list later

The architecture is clean because each piece manages one responsibility, which is why the code is easy to study and rebuild.

---

This section is meant to make the project easier for beginners to understand without having to read every line of code at once.

## Terms and definitions

Here are the most important terms used in this project and what they mean:

- Expo: a framework used to build and run React Native apps more easily.
- React Native: a library for building mobile apps with JavaScript and React-style components.
- src: the main folder where the project source code is stored.
- app folder: contains screens and navigation files that define the user interface.
- services folder: contains reusable logic such as API calls and local storage.
- API: a way for the app to communicate with a server and fetch data.
- iTunes Search API: Apple's public search service used to find movies and TV shows.
- AsyncStorage: local storage used to save the watchlist on the device.
- useState: a React hook used to store variables like search text or results.
- useEffect: a React hook that runs code after rendering or when a value changes.
- useFocusEffect: a hook that runs when a screen becomes active again.
- FlatList: a component for rendering lists efficiently.
- Pressable: a touchable component used for buttons and clickable cards.
- normalize: the process of converting raw data into one consistent format.
- watchlist: the saved list of movies or TV shows the user likes.
- route parameter: a value passed in the URL, such as an ID in /movie/[id].
- mediaType: tells whether the item is a movie or a TV show.
- debounce: waiting a little before running a function so it does not fire too often while typing.
- state: data stored temporarily while the app is running.
- component: a reusable UI block such as a screen or card.
- navigation: moving between screens in the app.
- layout: a file that wraps screens with shared styles and structure.

### Quick glossary for project-specific terms

- Search screen: the screen where the user types movie or series names.
- Watchlist screen: the screen that shows saved items.
- Detail screen: the page that shows more information about one title.
- Saved item: a movie or TV title added to the watchlist.
- Artwork: the poster or image used for the title.
- Filter: an option to view only movies, TV shows, or all results.
- Query: the text entered by the user to search.
- Result: one movie or TV item returned by the API.

These terms appear throughout the code and will help you understand the project more quickly.