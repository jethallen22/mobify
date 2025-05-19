import { MovieCategoriesEnum, MovieData } from "@/types/types";
import {
  tmdbCategoryMovies,
  tmdbMovieTrailer,
  tmdbSearchMovies,
} from "@/utils/utils";
import { isEqual } from "lodash";
import { create } from "zustand";

interface MovieStoreState {
  movie: MovieData;
  setMovie: (movie: MovieData) => void;
  popular: MovieData[];
  topRated: MovieData[];
  upcoming: MovieData[];
  nowPlaying: MovieData[];
  discover: MovieData[];
  searchResults: MovieData[];
  isLoading: boolean;
  videos: any[];
  hasMoreUpcoming: boolean;

  fetchMovies: (pageNumber: number) => Promise<void>;
  fetchVideos: (movieId: number) => Promise<void>;
  fetchSearchResults: (query: string, pageNumber: number) => Promise<void>;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
  movie: {} as MovieData,
  setMovie: (movie: MovieData) => set({ movie }),
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  discover: [],
  searchResults: [],
  isLoading: false,
  hasMoreUpcoming: true,

  fetchMovies: async (pageNumber: number) => {
    set({ isLoading: true });
    try {
      const [popular, topRated, upcoming, nowPlaying, discover] =
        await Promise.all([
          tmdbCategoryMovies(MovieCategoriesEnum.popular, pageNumber),
          tmdbCategoryMovies(MovieCategoriesEnum.top_rated, pageNumber),
          tmdbCategoryMovies(MovieCategoriesEnum.upcoming, pageNumber),
          tmdbCategoryMovies(MovieCategoriesEnum.now_playing, pageNumber),
          tmdbCategoryMovies(MovieCategoriesEnum.discover, pageNumber),
        ]);
      set((state) => ({
        popular: isEqual(pageNumber, 1)
          ? popular.results || []
          : [...(state.popular || []), ...(popular.results || [])],
        topRated: isEqual(pageNumber, 1)
          ? topRated.results || []
          : [...(state.topRated || []), ...(topRated.results || [])],
        upcoming: isEqual(pageNumber, 1)
          ? upcoming.results || []
          : [...(state.upcoming || []), ...(upcoming.results || [])],
        nowPlaying: isEqual(pageNumber, 1)
          ? nowPlaying.results || []
          : [...(state.nowPlaying || []), ...(nowPlaying.results || [])],
        discover: isEqual(pageNumber, 1)
          ? discover.results || []
          : [...(state.discover || []), ...(discover.results || [])],

        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch movies", error);
      set({ isLoading: false });
    }
  },

  fetchSearchResults: async (query: string, pageNumber: number) => {
    set({ isLoading: true });
    try {
      const response = await tmdbSearchMovies(query, pageNumber);
      const newResults = response?.results || [];
      const hasMore = pageNumber < response?.total_pages;

      set((state) => ({
        searchResults: isEqual(pageNumber, 1)
          ? newResults
          : [...state.searchResults, ...newResults],
        hasMoreSearchResults: hasMore,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch search results", error);
      set({ isLoading: false });
    }
  },

  videos: [],
  fetchVideos: async (movieId: number) => {
    try {
      const videos = await tmdbMovieTrailer(movieId).then((data) => {
        set({ videos: data.results || [], isLoading: false });
      });
    } catch (error) {
      console.error("Failed to fetch videos", error);
      set({ isLoading: false });
    }
  },
}));
