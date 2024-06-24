import Movie from '../db/models/Movie.js';

export const getMovies = () => Movie.find();
