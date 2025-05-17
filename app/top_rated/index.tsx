import MovieItem from "@/components/MovieItem";
import { useMovieStore } from "@/hooks/stores/useMovieStores";
import React from "react";
import { ScrollView, View } from "react-native";

const index = () => {
  const { topRated: movies } = useMovieStore();
  return (
    <View>
      <ScrollView>
        {movies.map((movie, key) => (
          <MovieItem movie={movie} key={key} />
        ))}
      </ScrollView>
    </View>
  );
};

export default index;
