# Movie-IT303

## Project Overview
Movie Explorer is a mobile application built with Expo and React Native. It lets users search for movies and TV series, view item details, and save favorites to a watchlist.

## Features
- Search for movies and TV titles
- Filter results by category
- View details such as genre, description, and release year
- Add or remove items from a watchlist
- Save favorites locally on the device
- Use a dark-themed streaming-style interface

## Technologies Used
- Expo
- React Native
- JavaScript
- iTunes Search API
- AsyncStorage

## Project Structure
- MovieExplorer/ — main Expo app
  - src/app/ — screens and navigation
  - src/services/ — API and storage logic
  - app.json — app configuration
  - package.json — dependencies and scripts

## How It Works
The app sends a search query to the iTunes Search API. The response is cleaned and normalized, then displayed in the UI. When the user taps a title, the detail screen loads more information. If the user likes the item, it can be saved to the watchlist using local storage.

## Setup and Running
```bash
cd Movie-IT303/MovieExplorer
npm install
npx expo start
```

## Terms and Definitions
- Expo: framework for building and running React Native apps.
- React Native: library for creating mobile apps with JavaScript.
- API: a system that lets an app request data from a server.
- iTunes Search API: public service used to fetch movie and TV data.
- Watchlist: saved list of favorite items.
- AsyncStorage: local storage used to save the watchlist.
- Screen: one page in the app, such as Search or Watchlist.
- Route: a navigation path to a specific screen.
- State: data stored while the app is running, such as search results.
- View: a container component that groups UI elements together.
- Text: component used to display text.
- Image: component used to show a poster or image.
- Pressable: touchable component used for buttons and cards.
- FlatList: component used to render a list efficiently.
- useState: React hook used to store variables in a component.
- useEffect: React hook used to run code after rendering or when data changes.

### Example: how View works
```jsx
<View style={{ backgroundColor: 'black', padding: 20 }}>
  <Text>Movie Explorer</Text>
</View>
```
This creates a black container with text inside it. The View acts like a box that holds the content together.

### Example: how useState works
```jsx
const [query, setQuery] = useState('');
```
This stores the user's search text. When the user types, the value updates and the screen re-renders.

## Tags / Keywords
- Mobile App
- Expo
- React Native
- Movie Search
- TV Search
- Watchlist
- iTunes API
- Local Storage
- JavaScript
- UI Design

## Purpose
This project demonstrates how to build a small mobile app that combines search, navigation, API data, and local storage in one working flow.
