import Movie from '../db/models/Movie.js';

export const getMovies = () => Movie.find();

export const getMovieById = (id) => Movie.findById(id); //?повертає фільм або null

// export const addMovie = () => Movie;

// export const deleteMovie = (id) => Movie;
