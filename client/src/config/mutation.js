import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation AddMovie($newMovie: movieInput) {
    addMovie(data: $newMovie) {
      _id
      title
      overview
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($movieId: ID, $newData: movieInput) {
    updateMovie(id: $movieId, movie: $newData) {
      _id
      title
      overview
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID) {
    deleteMovie(id: $movieId) {
      message
    }
  }
`;
