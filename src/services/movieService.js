import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const data = { ...movie };
    delete data._id;

    return http.put(movieUrl(movie._id), data);
  }

  return http.post(apiEndpoint, movie);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}
