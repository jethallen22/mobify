import { useMovieStore } from "@/hooks/stores/useMovieStores";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import "react-native-reanimated";

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#f0f0f0",
    marginRight: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  searchInput: {
    height: 36,
    fontSize: 16,
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { fetchSearchResults } = useMovieStore();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "",
            headerLeft: () => (
              <Image
                source={require("../assets/images/mobify-logo.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <View style={{ width: 30, height: 30 }}>
                <MaterialCommunityIcons
                  name="menu"
                  size={30}
                  color="#4187DE"
                  onPress={() => {}}
                />
              </View>
            ),
            headerSearchBarOptions: {
              placeholder: "Search",
              hideWhenScrolling: false,
              autoCapitalize: "none",
              onSearchButtonPress: (event) => {
                const query = event.nativeEvent.text;
                if (query) {
                  fetchSearchResults(event.nativeEvent.text, 1);
                  router.push({
                    pathname: "/search",
                    params: { query },
                  });
                }
              },
            },
          }}
        />
        <Stack.Screen
          name="[category]/index"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            headerTitle: () => (
              <Image
                source={require("../assets/images/mobify-logo.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ),
            headerSearchBarOptions: {
              placeholder: "Search",
              hideWhenScrolling: false,
              autoCapitalize: "none",
              onSearchButtonPress: (event) => {
                const query = event.nativeEvent.text;
                if (query) {
                  fetchSearchResults(event.nativeEvent.text, 1);
                  router.push({
                    pathname: "/search",
                    params: { query },
                  });
                }
              },
            },
          }}
        />
        <Stack.Screen
          name="[category]/[id]"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            headerTitle: () => (
              <Image
                source={require("../assets/images/mobify-logo.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            headerTitle: () => (
              <Image
                source={require("../assets/images/mobify-logo.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
