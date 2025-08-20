# NavGuide

A comprehensive React Native navigation template showcasing modern UI patterns, authentication flows, and interactive components using Expo and React Navigation.

## 🚀 Features

- **Authentication**: Complete auth flow with Clerk integration
- **Navigation Patterns**: Tabs, Drawer, Stack, and Modal navigation
- **Bottom Sheets**: Interactive bottom sheet components
- **Dynamic Routing**: File-based routing with parameters
- **Profile Management**: User profile updates with image selection
- **Data Visualization**: Charts and graphs using react-native-gifted-charts
- **QR Code Generation**: Built-in QR code functionality
- **Theme Support**: Light and dark mode compatibility

## 📱 Tech Stack

![Expo](https://img.shields.io/badge/Expo-~51.0.28-000020?style=flat&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.74.5-61DAFB?style=flat&logo=react&logoColor=black)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.3.3-3178C6?style=flat&logo=typescript&logoColor=white)
![Expo Router](https://img.shields.io/badge/Expo%20Router-~3.5.23-000020?style=flat&logo=expo&logoColor=white)
![React Navigation](https://img.shields.io/badge/React%20Navigation-^6.0.2-6B46C1?style=flat&logo=react&logoColor=white)

## 🛠️ Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (14 or newer)
- npm or yarn
- Expo CLI
- React Native development environment

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MasterBhuvnesh/NavGuide.git
   cd NavGuide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Bottom Sheet dependencies**
   ```bash
   npm i @gorhom/bottom-sheet@^4
   npx expo install react-native-reanimated react-native-gesture-handler
   ```

4. **Configure Babel**
   
   Add the following plugin to your `babel.config.js`:
   ```javascript
   plugins: [
     'react-native-reanimated/plugin',
   ],
   ```

5. **Setup Authentication**
   
   Install Clerk dependencies:
   ```bash
   npm i @clerk/clerk-expo @expo/metro-runtime
   ```

6. **Configure Environment Variables**
   
   Create a `.env` file and add your Clerk publishable key:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

7. **Start the development server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```bash
app/
├── +html.tsx                 # Web HTML configuration
├── +not-found.tsx           # 404 error page
├── about.tsx                # About page with user profile
├── index.tsx                # Main entry point
├── modal.tsx                # Contact modal screen
├── _layout.tsx              # Root layout with providers
├── (auth)/                  # Authentication group
│   ├── sign-in.tsx         # Sign in screen
│   ├── sign-up.tsx         # Sign up screen
│   └── _layout.tsx         # Auth layout
├── (drawer)/               # Drawer navigation group
│   ├── favourites.tsx      # Favourites with QR code
│   ├── settings.tsx        # Settings with logout
│   ├── _layout.tsx         # Drawer layout
│   └── (tabs)/            # Nested tabs
│       ├── two.tsx        # Profile tab
│       ├── _layout.tsx    # Tab layout
│       └── feed/          # Feed stack
│           ├── index.tsx  # Feed home with bottom modal
│           ├── new.tsx    # New post screen
│           ├── add.tsx    # Graph modal with charts
│           └── _layout.tsx
├── (update)/              # Profile update group
│   ├── name.tsx          # Update name screen
│   ├── pic.tsx           # Update profile picture
│   └── _layout.tsx       # Update layout
└── blog/                 # Blog section
    ├── index.tsx         # Blog listing
    └── [id].tsx          # Dynamic blog post
```

## 🎯 Key Components

### Authentication Flow
- Complete sign-in/sign-up with Clerk
- Automatic redirect based on auth state
- Secure token storage using Expo SecureStore

### Navigation Patterns
- **Stack Navigation**: Linear page flow
- **Tab Navigation**: Bottom tab bar with custom styling
- **Drawer Navigation**: Side menu with custom content
- **Modal Presentation**: Overlay screens

### Bottom Sheet Integration
- **Bottom Sheet**: Persistent bottom drawer
- **Bottom Sheet Modal**: Dismissible overlay sheet
- **Custom Backdrop**: Blur effects and tap-to-dismiss

### Profile Management
- Username and personal information updates
- Custom profile picture selection
- Async storage for user preferences

### Data Visualization
- Interactive bar charts using react-native-gifted-charts
- Transparent modal presentation
- Animated chart transitions

## 🔧 Configuration

### Clerk Authentication Setup

1. Go to your Clerk dashboard
2. Navigate to **Configure** → **Email, Phone, Username**
3. Enable **Username** and **Personal Information**
4. Copy your publishable key to the environment variables

### Bottom Sheet Integration

The app includes bottom sheet configuration in the main layout:

```tsx
<GestureHandlerRootView style={{ flex: 1 }}>
  <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <BottomSheetModalProvider>
      {/* Your app content */}
    </BottomSheetModalProvider>
  </ThemeProvider>
</GestureHandlerRootView>
```

## 📊 Features Showcase

### Graph Modal
- Transparent modal background
- Interactive bar charts
- Smooth animations with Reanimated
- Dark/light theme support

### QR Code Generation
- Dynamic QR code creation
- Bottom sheet presentation
- Customizable size and colors

### Profile Updates
- Real-time name updates
- Profile picture selection from predefined assets
- Toast notifications for user feedback

## 🚀 Development Notes

- Uses Expo Router for file-based navigation
- TypeScript support throughout the project
- Custom themed components for consistent styling
- Gesture handling for interactive elements
- Secure authentication token management

## 📝 Todo

- [x] Authentication with Clerk
- [x] Navigation patterns (Tabs, Drawer, Stack)
- [x] Bottom sheet components
- [x] Profile management
- [x] QR code functionality
- [x] Data visualization with charts
- [ ] Push notifications
- [ ] Offline data synchronization

## 🤝 Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 👨‍💻 Author

**Bhuvnesh Verma**
- LinkedIn: [bhuvneshverma](https://www.linkedin.com/in/bhuvneshverma/)
- GitHub: [MasterBhuvnesh](https://github.com/MasterBhuvnesh)

---

⭐ Don't forget to star this repo if you found it helpful!
