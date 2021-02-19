const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
    series: [Series]
    one_series(id: ID): Series
  }

  input movieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input tvShowInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Message {
    message: String
  }

  type Mutation {
    addMovie(data: movieInput): Movie
    addTvShow(data: tvShowInput): Series
    updateMovie(id: ID, movie: movieInput): Movie
    updateTvShow(id: ID, tvShow: tvShowInput): Series
    patchMovieTags(id: ID, input: [String]): Movie
    patchTvShowTags(id: ID, input: [String]): Movie
    deleteMovie(id: ID): Message
    deleteTvShow(id: ID): Message
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const moviesData = await redis.get("movies:db");
      if (moviesData) {
        console.log("movies dari cache redis");
        return JSON.parse(moviesData);
      } else {
        console.log("movies dari axios");
        const { data } = await axios.get("http://localhost:4001/movies");
        redis.set("movies:db", JSON.stringify(data));
        return data;
      }
    },
    movie: async (_, args) => {
      const { id } = args;
      const { data } = await axios.get(`http://localhost:4001/movies/${id}`);
      return data[0];
    },
    series: async () => {
      const tvShowsData = await redis.get("tv:db");
      if (tvShowsData) {
        console.log("tv show dari cache redis");
        return JSON.parse(tvShowsData);
      } else {
        console.log("tv show dari axios");
        const { data } = await axios.get("http://localhost:4002/tv");
        redis.set("tv:db", JSON.stringify(data));
        return data;
      }
    },
    one_series: async (_, args) => {
      const { id } = args;
      const { data } = await axios.get(`http://localhost:4002/tv/${id}`);
      return data[0];
    },
  },
  Mutation: {
    addMovie: async (parent, args, context, info) => {
      try {
        await redis.del("movies:db");
        const { data } = await axios.post(
          "http://localhost:4001/movies",
          args.data
        );
        return data[0];
      } catch (error) {
        return error;
      }
    },
    addTvShow: async (parent, args, context, info) => {
      try {
        await redis.del("tv:db");
        const { data } = await axios.post(
          "http://localhost:4002/tv",
          args.data
        );
        return data[0];
      } catch (error) {
        return error;
      }
    },
    updateMovie: async (_, args) => {
      try {
        const { id, movie } = args;
        await redis.del("movies:db");
        const { data } = await axios.put(
          `http://localhost:4001/movies/${id}`,
          movie
        );
        return data[0];
      } catch (error) {
        return error;
      }
    },
    updateTvShow: async (_, args) => {
      try {
        const { id, tvShow } = args;
        await redis.del("tv:db");
        const { data } = await axios.put(
          `http://localhost:4002/tv/${id}`,
          tvShow
        );
        return data[0];
      } catch (error) {
        return error;
      }
    },
    patchMovieTags: async (_, args) => {
      try {
        const { id, input } = args;
        const inputData = {
          $set: { tags: input },
        };
        await redis.del("movies:db");
        const { data } = await axios.patch(
          `http://localhost:4001/movies/${id}`,
          inputData
        );
        if (data.message === "document not found") {
          throw { message: data.message };
        } else {
          const movie = await axios.get(`http://localhost:4001/movies/${id}`);
          return movie.data[0];
        }
      } catch (error) {
        return error;
      }
    },
    patchTvShowTags: async (_, args) => {
      try {
        const { id, input } = args;
        const inputData = {
          $set: { tags: input },
        };
        await redis.del("tv:db");
        const { data } = await axios.patch(
          `http://localhost:4002/tv/${id}`,
          inputData
        );
        if (data.message === "document not found") {
          throw { message: data.message };
        } else {
          const tvShow = await axios.get(`http://localhost:4002/tv/${id}`);
          return tvShow.data[0];
        }
      } catch (error) {
        return error;
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(
          `http://localhost:4001/movies/${id}`
        );
        if (data.message === "document not found") {
          throw { message: data.message };
        } else {
          await redis.del("movies:db");
          return data;
        }
      } catch (error) {
        return error;
      }
    },
    deleteTvShow: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`http://localhost:4002/tv/${id}`);
        if (data.message === "document not found") {
          throw { message: data.message };
        } else {
          await redis.del("tv:db");
          return data;
        }
      } catch (error) {
        return error;
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
