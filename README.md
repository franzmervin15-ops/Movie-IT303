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
- Expo: a framework for building and running React Native apps. It helps manage the app environment and project setup.
- React Native: a JavaScript library used to create mobile apps for Android and iOS. It renders native UI components from shared code.
- API: a system that allows apps to request and receive data from a server. In this project, it fetches movie and TV data from iTunes.
- iTunes Search API: the public service used to fetch movie and TV information. It provides search results and metadata for titles.
- Watchlist: a saved list of favorite titles selected by the user. It allows users to keep titles they want to remember or revisit.
- AsyncStorage: local storage used to keep the watchlist saved on the device. It stores the list even after the app is closed.
- Screen: an app page such as search, watchlist, or details. Each screen handles a different part of the user experience.
- Route: a navigation path that opens a specific screen. For example, a route can open the detail page for a selected movie.
- Filter: an option that narrows results to movies, TV shows, or all items. It helps users refine their search experience.
- Metadata: additional information such as release year, genre, or artist name. It gives details about each item in the list.
- State: data stored while the app is running, such as search results or selected filters. State updates when the user interacts with the app.

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