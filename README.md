# MovieExplorer

This is the Expo app for the Movie Explorer project.

## Overview
Movie Explorer is a React Native app for searching and saving movies and TV shows. It uses the public iTunes Search API to fetch titles, displays them in a dark-themed interface, and stores favorites in local storage using AsyncStorage.

## Features
- search for movies and TV titles
- filter between all, films, and TV
- open a detail screen for each title
- add or remove titles from the watchlist
- keep the saved list across app sessions

## Run the app
1. Open the project folder:
   ```bash
   cd Movie-IT303/MovieExplorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```

## Useful commands
```bash
npm run start
npm run web
npm run android
npm run ios
npm run lint
```

## Project structure
- src/app — screens and navigation routes
- src/services — API and local storage logic
- scripts/ — helper scripts
- app.json — Expo app configuration

## Notes
For the overall project summary, see the README in the parent folder.
This README is focused on running and understanding the Expo app itself.
>>>>>>> 497b277abd38f8885b1dfb1c3311782c005cc326
