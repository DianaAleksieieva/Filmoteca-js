import { getMovies } from './getMovies';
import genres from '../genres-list.json';
import { pagination } from './pagination';
export const getMoviesArray = async (mode, input, page) => {
  const response = await getMovies(mode, input, page);
  const movies = response.data.results;
  const total = response.data.total_pages;
  pagination.reset(total);

  changeDate(movies);
  changeGenres(movies);
  updateGenres(movies);

  return movies;
};

function changeDate(movies) {
  movies.forEach(movie => {
    movie.release_date = movie.release_date.slice(0, 4);
  });
}

function changeGenres(movies) {
  let genreIndex = 0;

  movies.forEach(movie => {
    const genreIds = movie.genre_ids;

    genreIds.forEach(genreId => {
      if (movie.genre_ids[genreIndex] === 10765) {
        movie.genre_ids[genreIndex] = 'Other';
      } else {
        movie.genre_ids[genreIndex] = ' ' + genres.find(option => option.id === genreId).name;

        genreIndex += 1;
      }
    });
    genreIndex = 0;
  });
}

function updateGenres(movies) {
  movies.forEach(movie => {
    if (movie.genre_ids.length > 3) {
      movie.genre_ids.splice(2, 1, ' Other');
      movie.genre_ids = movie.genre_ids.slice(0, 3);
    }
  });
}
