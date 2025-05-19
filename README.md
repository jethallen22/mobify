
# MOBIFY

A mobile movie app using React Native with Expo. The app will display a list of movies and allow users to view detailed information about each one. 

- The app uses React Expo router to handle screen transitions and fetch movie data from TMDB API.

- Integrated a state management library called Zustand to handle global variables.

- Integrated react-native-webview library to handle video play.

## Example Environtment Variables Configurations

```bash
    EXPO_PUBLIC_TMDB_API_KEY=
    EXPO_PUBLIC_TMDB_API_TOKEN=
    EXPO_PUBLIC_TMDB_API_URL=
    EXPO_PUBLIC_TMDB_IMAGE_URL=
    EXPO_PUBLIC_TMDB_AUTHORIZE_URL=
    EXPO_PUBLIC_YOUTUBE_EMBED_URL=
```
## Installation

How to install and run Mobify app locally.

1. Clone the project.
```bash
    git clone https://github.com/jethallen22/mobify.git
```
2. Navigate through the project directory.
```bash
    cd mobify
```
3. Switch branch.
```bash
    git checkout development
```
4. Pull the latest development branch.
```bash
    git pull origin development
```
5. Install the dependencies
```bash
    npm install
```
6. Run the expo app.
```bash
    npx expo start
```
7. Run the app.
```bash
› Press a │ open Android
› Press i │ open iOS simulator
```
## Scope and Limitation

- Due to time constraint I've decided to make the app's UI simple yet visually appealing to the user without neglecting the overall experience of the user
- I've decided to limit the app only to browsing of list of movies and viewing of viewing of movie details
- I've implemented zustand for a better state management library
- It took a while for me to get the hang of dynamic expo routing
- I've implemented a react-native-webview to allow user to play the trailer or video without leaving the application
