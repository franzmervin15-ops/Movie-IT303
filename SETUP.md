# Drop-in files for MovieExplorer (JavaScript, Expo Router, no API key)

Uses Apple's iTunes Search API (`itunes.apple.com`), which is free and
requires no signup or key.

## 1. Install the missing dependency
```bash
npx expo install @react-native-async-storage/async-storage
```

## 2. No API key needed
`src/services/itunes.js` calls `https://itunes.apple.com/search` and
`https://itunes.apple.com/lookup` directly — nothing to configure.

Trade-offs vs. a keyed API like TMDB:
- No "trending" endpoint, so Search opens with a prompt instead of a
  default list — type something to see results.
- TV results come back as **seasons** (e.g. "Show Name, Season 2"), not
  ongoing series entries, since that's how iTunes catalogs TV content.

## 3. Where each file goes in your existing project

| This file | Goes to | Action |
|---|---|---|
| `src/app/_layout.js` | `src/app/_layout.tsx` | **Replace** |
| `src/app/(tabs)/_layout.js` | `src/app/(tabs)/_layout.js` | **New folder** |
| `src/app/(tabs)/index.js` | `src/app/(tabs)/index.js` | Replaces `src/app/index.tsx` |
| `src/app/(tabs)/watchlist.js` | `src/app/(tabs)/watchlist.js` | Replaces `src/app/explore.tsx` |
| `src/app/movie/[id].js` | `src/app/movie/[id].js` | **New** |
| `src/services/itunes.js` | `src/services/itunes.js` | **New** |
| `src/services/watchlist.js` | `src/services/watchlist.js` | **New** |

Optional cleanup since the project is now pure JS: delete `tsconfig.json`
and remove `typescript`/`@types/react` from `devDependencies`.

## 4. Run it
```bash
npx expo start
```
