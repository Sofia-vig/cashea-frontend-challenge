# 📝 Tasky

## 🛠️ Setup Instructions

### Clone the repository

```
https://github.com/Sofia-vig/cashea-frontend-challenge.git
cd cashea-frontend-challenge
```

### Install dependencies

```
yarn
```

### Run the project

##### Android (emulator or device):

```
yarn android
```

##### iOS (requires macOS + Xcode):

```
yarn ios
```

##### Or start Expo manually:

```
yarn start
```

### API configuration

The project already connects to a hosted MockAPI endpoint

You don’t need to run any local server.

### Requirements

- Node.js ≥ 18

- Yarn package manager

- Android Studio (emulator) or a real Android device

- Xcode (for iOS, only on macOS)

## 📦 Dependencies and Versions

Main dependencies:

```
{
  "expo": "~51.0.34",
  "react": "18.2.0",
  "react-native": "0.74.5",
  "expo-router": "~3.5.23",
  "nativewind": "^2.0.11",
  "zustand": "^5.0.8",
  "axios": "^1.12.2"
}
```

Additional UI & system packages:

- expo-checkbox, lucide-react-native, expo-font
- react-native-safe-area-context, react-native-screens, expo-status-bar.

## ⚙️ Any Special Configuration Needed

- The app is built with Expo Router, so no manual navigation setup is required.

- It uses MockAPI as the backend — you don’t need to run any local API server.

- State is persisted using Zustand + AsyncStorage, so data is stored locally between sessions.

- Tailwind styling is handled via NativeWind, already configured in: tailwind.config.js and babel.config.js (plugin: "nativewind/babel")

- Fonts are loaded automatically using expo-font with DM Sans.

## 🧠 State Management Choice

I chose Zustand for state management because it’s lightweight, simple, and works really well with React Native and Expo.
It allows me to keep a minimal and predictable global store without the boilerplate of Redux.

The tasks are persisted using AsyncStorage, so the user’s data remains after closing the app.
Zustand’s API also makes it easy to combine local actions with async API calls, which fits perfectly for a small app like this.

## ⚖️ Assumptions & Trade-offs

I used MockAPI to make it easier for reviewers to test the app without any local backend setup.

I didn’t include authentication since it wasn’t required for the scope of the challenge.

I focused on clean componentization and reusable UI elements to keep the code organized.

Styling was done with NativeWind (TailwindCSS for React Native) for speed, consistency, and easier dark/light mode handling.

I prioritized simplicity, smooth animations, and a clear user flow over adding extra features.

## 📥 Downloads

- [Android (APK) — Download here](https://expo.dev/artifacts/eas/pL6hyfsBRNFLmnskF9dZFx.apk)

- [iOS (Simulator) — Download here](https://expo.dev/artifacts/eas/w2cFJxpzChg4jPGXq5heCE.tar.gz) (Works on macOS with Xcode Simulator. Extract the .tar.gz file and drag the .app inside the Simulator window)
