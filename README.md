# Movie-IT303

## Project Overview
Movie Explorer is a mobile application developed with Expo and React Native. The app allows users to search for movies and TV series, view details about each title, and save favorites to a personal watchlist.

## Features
- Search for movies and television titles
- Filter results by category
- View item details including description and metadata
- Add or remove titles from the watchlist
- Store saved items locally on the device
- Modern dark-themed UI for a streaming-style experience

## Technologies Used
- Expo
- React Native
- JavaScript
- iTunes Search API
- AsyncStorage for local data persistence

## Project Structure
- MovieExplorer/ — main Expo application folder
  - src/app/ — screens and route-based navigation
  - src/services/ — API and watchlist logic
  - app.json — Expo project configuration
  - package.json — dependencies and scripts

## How It Works
The app uses the public iTunes Search API to fetch movie and TV data based on the user's search. The returned results are normalized into a consistent format and displayed in the UI. Users can select a title to view more details and save it to a local watchlist for later browsing.

## Setup and Running
To run the project:

1. Open the app folder:
   ```bash
   cd Movie-IT303/MovieExplorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo app:
   ```bash
   npx expo start
   ```

## Notes
- This top-level README provides the project summary.
- The README inside the MovieExplorer folder contains the app-specific setup and developer instructions.

## Terms and Definitions
- Expo: a framework for building and running React Native apps. It helps manage the app environment, startup, and project configuration.
- React Native: a JavaScript library used to create mobile apps for Android and iOS. It uses components such as View, Text, Image, and Pressable to build the screen.
- API: a system that allows apps to request and receive data from a server. In this project, it fetches movie and TV data from the iTunes Search API.
- iTunes Search API: the public service used to fetch movie and TV information. It provides search results, artwork links, titles, genres, and descriptions.
- Watchlist: a saved list of favorite titles selected by the user. It allows the user to keep titles they want to re-open later.
- AsyncStorage: local storage used to keep the watchlist saved on the device. It stores the list in the app even after the app is closed.
- Screen: an app page such as search, watchlist, or details. Each screen handles a different part of the user experience.
- Route: a navigation path that opens a specific screen. For example, a route can open the details page for a selected movie.
- Filter: an option that narrows results to movies, TV shows, or all items. It helps users refine their search.
- Metadata: additional information such as release year, genre, or artist name. It gives more detail about each item in the list.
- State: data stored while the app is running, such as search results or selected filters. State updates whenever the user interacts with the app.
- View: a basic layout component in React Native. It acts like a container that groups other elements together, such as a card or a screen.
- Text: a component used to display text on the screen. Example: <Text>{item.title}</Text> shows the movie title.
- Image: a component used to show a picture such as a poster or cover image. It loads an image from a URL.
- Pressable: a touchable component used for buttons and cards. It listens for user taps and runs an action when pressed.
- FlatList: a component used to render a list efficiently. It is used to display many search results or watchlist items without making the app heavy.
- useState: a React hook that stores data in a component. Example: the query text or a list of results is stored with useState.
- useEffect: a hook that runs after the screen renders or when a value changes. It is commonly used here to load data after a search.
- useFocusEffect: a hook that runs when a screen becomes active again. It is used to refresh the watchlist each time the tab is opened.
- Async function: a function that performs work asynchronously and may wait for data. It is used for API calls and reading storage.
- Promise: a value that will complete later, usually after a network request. This helps the app wait for data before updating the UI.

### Example: how <View> works
In React Native, <View> is one of the most important components. It behaves like a box or container. For example:

```jsx
<View style={{ backgroundColor: 'black', padding: 20 }}>
  <Text>Movie Explorer</Text>
</View>
```

This tells the app:
- create a container area
- set a black background
- add padding inside the box
- place the text inside that box

So <View> is what holds elements together and gives the layout structure.

### Example: how useState works
```jsx
const [query, setQuery] = useState('');
```

This creates a variable called query and a function called setQuery. When the user types in the search box, the app updates the value of query. Then the screen re-renders and shows the new result.

### Example: how AsyncStorage works
```js
const list = await getWatchlist();
```

This reads the saved watchlist from device storage. The app can then show the saved items even after reopening the app.

## Tags / Keywords
- Mobile App
- Expo
- React Native
- Movie Search
- TV Search
- Watchlist
- iTunes API
- Local Storage
- UI Design
- JavaScript

## Purpose
This project demonstrates how to build a small mobile app that combines API-based search, screen navigation, and local storage in a clean and practical user flow.