import {
    AUTHENTICATION,
    DISCOVER_MOVIE,
    POPULAR_MOVIE,
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

export const tmdbPopularMovies = async () => {
  const url =
    process.env.EXPO_PUBLIC_TMDB_API_URL +
    POPULAR_MOVIE +
    "?language=en-US&page=1";
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
