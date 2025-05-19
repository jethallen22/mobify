import MovieDetails from "@/components/MovieDetails/MovieDetails";
import { useMovieStore } from "@/hooks/stores/useMovieStores";
import React from "react";
import { ScrollView } from "react-native";

const UpcomingMovieDetailsScreen = () => {
  const movie = useMovieStore((state) => state.movie);
  return (
    <ScrollView>
      <MovieDetails movie={movie} />
    </ScrollView>
  );
};

export default UpcomingMovieDetailsScreen;
