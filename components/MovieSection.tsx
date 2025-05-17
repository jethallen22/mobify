import { useMovieStore } from "@/hooks/stores/useMovieStores";
import { Link } from "expo-router";
import { isEqual } from "lodash";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DiscoverSection from "./DiscoverSection";
import MovieCarousel from "./MovieCarousel";

interface MovieSectionProps {
  isAuthenticated: boolean;
}

const MovieSection = ({ isAuthenticated }: MovieSectionProps) => {
  const {
    popular,
    topRated,
    upcoming,
    nowPlaying,
    discover,
    fetchMovies,
    isLoading,
  } = useMovieStore();

  const movieCategories = [
    {
      id: 1,
      title: "Popular",
      movies: popular,
      category: "popular",
    },
    {
      id: 2,
      title: "Top Rated",
      movies: topRated,
      category: "top_rated",
    },
    {
      id: 3,
      title: "Upcoming",
      movies: upcoming,
      category: "upcoming",
    },
    {
      id: 4,
      title: "Now Playing",
      movies: nowPlaying,
      category: "now_playing",
    },
  ];

  // Fetch popular movies from TMDB API
  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies();
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      {movieCategories.map(
        (category, index) =>
          category.movies.length > 0 && (
            <>
              <View key={category.id} style={styles.cateogryContainer}>
                <View style={styles.categoryTitleContainer}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Pressable
                    onPress={() => {
                      console.log(`Pressed ${category.title}`);
                    }}
                  >
                    <Link href={`/${category.category}`}>
                      <Text>See all</Text>
                    </Link>
                  </Pressable>
                </View>
                <MovieCarousel
                  movies={category.movies}
                  category={category.category}
                />
              </View>

              {isEqual(index, 1) && (
                <View>
                  <View style={styles.categoryTitleContainer}>
                    <Text style={styles.categoryTitle}>Discover</Text>
                    <Pressable
                      onPress={() => {
                        console.log(`Pressed ${index}`);
                      }}
                    >
                      <Link href={`/discover`}>
                        <Text>See all</Text>
                      </Link>
                    </Pressable>
                  </View>
                  <DiscoverSection movies={discover.slice(0, 4)} />
                </View>
              )}

              {isEqual(index, 3) && (
                <View>
                  <DiscoverSection movies={discover.slice(5, 9)} />
                </View>
              )}
            </>
          )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  cateogryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  categoryTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
});

export default MovieSection;
