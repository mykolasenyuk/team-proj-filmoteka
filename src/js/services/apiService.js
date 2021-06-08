import axios from 'axios';

const API_KEY = '1aa8151ecc72e8e6dae871e3aeaed3b2';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getTrendingMovies() {
  const tredingFilms = await axios
    .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(({ data }) => console.log(data));

  return tredingFilms;
  
}

export async function getMovieByQuery(query) {
  const filmsByQuery = await axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}` + query)
    .then(({ data }) => data);

  return filmsByQuery;
}

export async function getMovieById(id) {
  const filmsById = await axios
    .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(({ data }) => data);

  return filmsById;
}
