//     "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=NG",
//     options,
//   );
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWM2ODZjYjY4NzRlNzcyMTM3NTQzMTQ4NGQxZmY1YyIsInN1YiI6IjYzNzdhYWQxMzRlMTUyMDA3ZjM3NmEwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZtfWhsKz-qTwKG_QG3J57iOSzNJKQbB7vYepKnPUlIc",
//   },
// };

export type MovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  [k: string]: unknown;
};

export type MovieResponse<T> = {
  dates: {
    maximum: string;
    minimum: string;
    [k: string]: unknown;
  };
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
  [k: string]: unknown;
};

export async function fecthApi<T>(endpoint: string) {
  const URI = new URL(endpoint, import.meta.env.VITE_BASE_URI);
  URI.searchParams.append("api_key", import.meta.env.VITE_APPI_KEY);
  // console.log(URI);

  const response = await fetch(URI);
  //console.log(response.json());
  //const result = response.json();
  return response.json() as Promise<T>;

  //     const baseUri: string = `${import.meta.env.VITE_BASE_URI}/${ENDPOINTS.POPULAR_MOVIES}`
  //     console.log(baseUri);

  //    const response = await fetch(baseUri, options)

  //   const result = response.json();
  //   console.log(result);
}

// export async function fetchMovieApi() {
//     const response = new URI()
// }

