import MovieItem from "@/components/MovieItem";
import { useMovieStore } from "@/hooks/stores/useMovieStores";
import React from "react";
import { View } from "react-native";

const index = () => {
  const { discover: movies } = useMovieStore();
  return (
    <View>
      {movies.map((movie, key) => (
        <MovieItem movie={movie} key={key} />
      ))}
    </View>
  );
};

export default index;
