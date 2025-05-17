import { MovieCategoriesEnum, MovieData } from "@/types/types";
import { tmdbCategoryMovies } from "@/utils/utils";
import { create } from "zustand";

interface MovieStoreState {
  popular: MovieData[];
  topRated: MovieData[];
  upcoming: MovieData[];
  nowPlaying: MovieData[];
  discover: MovieData[];
  isLoading: boolean;

  fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  discover: [],
  isLoading: false,

  fetchMovies: async () => {
    set({ isLoading: true });
    try {
      const [popular, topRated, upcoming, nowPlaying, discover] = await Promise.all([
        tmdbCategoryMovies(MovieCategoriesEnum.popular),
        tmdbCategoryMovies(MovieCategoriesEnum.top_rated),
        tmdbCategoryMovies(MovieCategoriesEnum.upcoming),
        tmdbCategoryMovies(MovieCategoriesEnum.now_playing),
        tmdbCategoryMovies(MovieCategoriesEnum.discover),
      ]);

      set({
        popular: popular.results || [],
        topRated: topRated.results || [],
        upcoming: upcoming.results || [],
        nowPlaying: nowPlaying.results || [],
        discover: discover.results || [],

        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch movies", error);
      set({ isLoading: false });
    }
  },
}));
