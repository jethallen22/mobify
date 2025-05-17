import { MovieData } from "@/types/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface DiscoverItemProps {
  movie: MovieData;
}

const MovieItem = ({ movie }: DiscoverItemProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{
            uri: process.env.EXPO_PUBLIC_TMDB_IMAGE_URL + movie?.poster_path,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
          <Text style={styles.overview} numberOfLines={4}>
            {movie.overview}
          </Text>
          <Text numberOfLines={1}>{movie.release_date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF",
    flexDirection: "row",
    padding: 16,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  textContainer:{
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  overview: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    flexShrink: 1,
  },
});

export default MovieItem;
