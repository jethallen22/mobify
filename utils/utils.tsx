import {
    AUTHENTICATION,
    DISCOVER_MOVIE,
    MOVIE,
    NOW_PLAYING,
    POPULAR_MOVIE,
    SEARCH_MOVIE,
    TOP_RATED,
    UPCOMING,
} from "@/constants/constants";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_TOKEN}`,
  },
};

export const tmdbAuthentication = async () => {
  const url = process.env.EXPO_PUBLIC_TMDB_API_URL + AUTHENTICATION;
  const response = await fetch(url, options);
  try {
    if (response) {
      return response.json();
    } else {
      console.error("Response is null");
    }
  } catch (err) {
    console.error(err);
  }
};

export const tmdbMovies = async () => {
  const url =
    process.env.EXPO_PUBLIC_TMDB_API_URL +
    DISCOVER_MOVIE +
    "?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const response = await fetch(url, options);
  try {
    if (response) {
      return response.json();
    } else {
      console.error("Response is null");
    }
  } catch (err) {
    console.error(err);
  }
};

export const tmdbCategoryMovies = async (category: string, pageNumber: number) => {
  let categoryUrl = "";
  switch (category) {
    case "popular":
      categoryUrl = POPULAR_MOVIE;
      break;
    case "top_rated":
      categoryUrl = TOP_RATED;
      break;
    case "now_playing":
      categoryUrl = NOW_PLAYING;
      break;
    case "upcoming":
      categoryUrl = UPCOMING;
      break;
    case "discover":
      categoryUrl = DISCOVER_MOVIE;
  }
  const url =
    process.env.EXPO_PUBLIC_TMDB_API_URL +
    categoryUrl +
    "?language=en-US&page=" + pageNumber;
  const response = await fetch(url, options);
  try {
    if (response) {
      return response.json();
    } else {
      console.error("Response is null");
    }
  } catch (err) {
    console.error(err);
  }
};

export const tmdbMovieTrailer = async (movieId: number) => {
  const url =
    process.env.EXPO_PUBLIC_TMDB_API_URL +
    `${MOVIE}/${movieId}/videos?language=en-US`;
  const response = await fetch(url, options);
  try {
    if (response) {
      return response.json();
    } else {
      console.error("Response is null");
    }
  } catch (err) {
    console.error(err);
  }
};

export const tmdbSearchMovies = async (query: string, pageNumber: number) => {
  const url =
    process.env.EXPO_PUBLIC_TMDB_API_URL +
    `${SEARCH_MOVIE}?query=${query}&language=en-US&page=${pageNumber}&include_adult=false`;
  const response = await fetch(url, options);
  try {
    if (response) {
      return response.json();
    } else {
      console.error("Response is null");
    }
  } catch (err) {
    console.error(err);
  }
}
