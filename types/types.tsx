export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MovieCategoriesEnum {
  popular = "popular",
  top_rated = "top_rated",
  now_playing = "now_playing",
  upcoming = "upcoming",
  discover= "discover",
}
