# NavGuide

NavGuide is a React Native application demonstrating various navigation patterns and UI components using Expo and React Navigation.

## Project Structure

The `app` folder contains the main application code, organized as follows:

```bash
app :
| +html.tsx
| +not-found.tsx
| about.tsx
| index.tsx
| modal.tsx
| \_layout.tsx
|
+---(drawer)
| | favourites.tsx
| | settings.tsx
| | \_layout.tsx
| |
| \---(tabs)
| | two.tsx
| | \_layout.tsx
| |
| \---feed
| index.tsx
| new.tsx
| \_layout.tsx
|
\---blog
index.tsx
[id].tsx
```

## Bottom Sheet

to install the bottom sheet component, run:

```bash
npm i @gorhom/bottom-sheet@^4
npx expo install react-native-reanimated react-native-gesture-handler
```

and in the babel.config.js file, add the following:

```bash
plugins: [
  'react-native-reanimated/plugin',
],
```

in the main \_layout.tsx file with :

```bash
<GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <BottomSheetModalProvider>
        ...
        </BottomSheetModalProvider>
      </ThemeProvider>
</GestureHandlerRootView>
```
