import MovieItem from "@/components/MovieItem";
import { useMovieStore } from "@/hooks/stores/useMovieStores";
import { MovieCategoriesEnum, MovieData } from "@/types/types";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    View,
    VirtualizedList,
} from "react-native";

interface MovieItemProps {
  item: MovieData;
  index: number;
}

const search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const {
    fetchSearchResults,
    isLoading,
    hasMoreUpcoming,
    searchResults: movies,
  } = useMovieStore();
  const [page, setPage] = useState(1);

  const getItem = (_: any, index: number) => movies[index];
  const getItemCount = () => movies.length;

  const renderItem = ({ item: movie, index: key }: MovieItemProps) => (
    <MovieItem
      movie={movie}
      key={key}
      category={MovieCategoriesEnum.upcoming}
    />
  );

  const loadMore = () => {
    if (!isLoading && hasMoreUpcoming) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSearchResults(query, nextPage);
    }
  };
  return (
    <View>
      <SafeAreaView />
      <VirtualizedList
        data={movies}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default search;
