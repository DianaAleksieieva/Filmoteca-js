import { getMovies } from './getMovies';

export const getMoviesArray = async (mode, input) => {
  const response = await getMovies(mode, input);
  const movies = response.data.results;
  movies.forEach(movie => {
    movie.release_date = movie.release_date.slice(0, 4);
  })
  return movies
}