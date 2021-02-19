import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query GetAll {
    movies {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
    series {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($movieId: ID) {
    movie(id: $movieId) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`;

export const GET_SERIES = gql`
  query GetSeries($seriesId: ID) {
    one_series(id: $seriesId) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`;
