import { MovieData } from "@/types/types";
import { Link } from "expo-router";
import { isEmpty } from "lodash";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface MovieCarouselProps {
  movies: MovieData[];
  category: string;
}

const MovieCarousel = ({ movies, category}: MovieCarouselProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie, index) => (
          <Image
            source={{
              uri: !isEmpty(movie)
                ? process.env.EXPO_PUBLIC_TMDB_IMAGE_URL + movie?.poster_path
                : "",
            }}
            style={styles.background}
            resizeMode="cover"
            key={index}
          />
        ))}
        <View style={styles.navButtonContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Link href={`/${category}`}>
              <Text style={styles.navButtonText}>›</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  background: {
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 180,
    width: 120,
  },
  navButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: 8,
    borderRadius: 6,
  },
  navButtonText: {
    fontSize: 40,
    color: "#000",
    fontWeight: "500",
  },
});

export default MovieCarousel;
