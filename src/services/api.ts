import { TMDB_API_KEY, OMDB_API_KEY } from '@env';
import axios from 'axios';

// API principal do TMDB para buscar detalhes e credits
export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
    language: 'pt-BR',
  },
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export const apiOMDb = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchOMDbMovie = async (title: string) => {
  return apiOMDb.get('', {
    params: {
      apikey: OMDB_API_KEY,
      t: title,
      plot: 'full',
    },
  });
};