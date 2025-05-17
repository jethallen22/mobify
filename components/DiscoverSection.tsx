import { MovieData } from "@/types/types";
import React from "react";
import { View } from "react-native";
import MovieItem from "./MovieItem";

interface DiscoverSectionProps {
  movies: MovieData[];
}
const DiscoverSection = ({ movies }: DiscoverSectionProps) => {
  return (
    <View>
      {movies.map(
        (movie, index) => index < 10 && <MovieItem key={index} movie={movie} />
      )}
    </View>
  );
};

export default DiscoverSection;
