import { GENRES } from "@/constants/constants";
import { useMovieStore } from "@/hooks/stores/useMovieStores";
import { MovieData } from "@/types/types";
import { isEmpty } from "lodash";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import RateComponent from "../ui/RateComponent";

interface MovieDetailsProps {
  movie: MovieData;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const videos = useMovieStore((state) => state.videos);
  const url = process.env.EXPO_PUBLIC_YOUTUBE_EMBED_URL + videos[0]?.key;
  return (
    <View>
      <Image
        source={{
          uri: process.env.EXPO_PUBLIC_TMDB_IMAGE_URL + movie?.poster_path,
        }}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie?.title}
        </Text>
        <View style={styles.genreContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {movie.genre_ids.map((id) => (
              <View style={styles.genreItemContainer} key={id}>
                <Text key={id} style={styles.genreText}>
                  {GENRES.genres.find((genre) => genre.id === id)?.name || ""}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.releaseDateContainer}>
          <Text style={styles.releaseDate} numberOfLines={2}>
            {movie?.release_date}
          </Text>
          <RateComponent rating={movie?.vote_average} />
        </View>
        <Text style={styles.overview}>{movie?.overview}</Text>
      </View>
      {!isEmpty(videos) && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: url }}
            style={styles.video}
            allowsInlineMediaPlayback={false}
            mediaPlaybackRequiresUserAction={true}
            startInLoadingState={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 2160 / 4,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#050505",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: "#050505",
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: "#050505",
    marginBottom: 8,
    textAlign: "justify",
  },
  genreContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 8,
  },
  genreItemContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginRight: 4,
    borderWidth: 1.5,
    borderColor: "#4187DE",
  },
  genreText: {
    fontSize: 12,
    color: "#666",
  },
  releaseDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoContainer: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    padding: 16,
  },
  video: {
    width: "100%",
  },
});

export default MovieDetails;
