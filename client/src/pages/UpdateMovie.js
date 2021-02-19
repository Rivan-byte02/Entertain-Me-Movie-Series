import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_MOVIE } from "../config/mutation";
import { GET_ALL, GET_MOVIE } from "../config/query";
import { useParams } from "react-router-dom";

export function UpdateMovies() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  const [
    updateMovie,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_MOVIE, {
    update(cache, { data: { updateMovie } }) {
      const currentCache = cache.readQuery({
        query: GET_ALL,
      });

      const currentMovie = cache.readQuery({
        query: GET_MOVIE,
        variables: {
          movieId: id,
        },
      });

      const movieIndex = currentCache.movies.findIndex(
        (movie) => movie._id === id
      );

      const newMoviesArray = [...currentCache.movies];

      newMoviesArray[movieIndex] = updateMovie;

      console.log(currentMovie, updateMovie);

      cache.writeQuery({
        query: GET_ALL,
        data: { ...currentCache, movies: [...newMoviesArray] },
      });

      cache.writeQuery({
        query: GET_MOVIE,
        data: { ...currentMovie, movie: updateMovie },
      });
    },
  });
  const [movieInput, setMovieInput] = useState({
    title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    tags: [],
  });

  useEffect(() => {
    if (data) {
      setMovieInput(data.movie);
    }
  }, [data]);

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === "tags") {
      const genre = value.split(", ");
      value = genre;
    }
    if (name === "popularity") {
      const popularity = Number(value);
      value = popularity;
    }
    const newInput = { ...movieInput, [name]: value };
    setMovieInput(newInput);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateMovie({
      variables: {
        movieId: id,
        newData: {
          title: movieInput.title,
          overview: movieInput.overview,
          poster_path: movieInput.poster_path,
          popularity: movieInput.popularity,
          tags: movieInput.tags,
        },
      },
    });
  };

  if (loading || loadingUpdate) {
    return <p>Still loading...</p>;
  }

  if (error || errorUpdate) {
    return (
      <p>
        Error : {error ? JSON.stringify(error) : JSON.stringify(errorUpdate)}
      </p>
    );
  }

  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/8e/d4/25/8ed4250fd8e48fa7ca24a834ba6c3d9d.jpg')",
        minHeight: "100vh",
      }}
      className="grid grid-cols-1"
    >
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-50 border border-gray-200 sm:max-w-xl sm:my-auto sm:mx-auto"
      >
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 bg-opacity-50 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                +
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Update a Movie</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Input New Data Base On Required Field Below.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Title</label>
                  <input
                    name="title"
                    type="text"
                    value={movieInput.title}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Movie title"
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Overview</label>
                  <input
                    name="overview"
                    type="text"
                    value={movieInput.overview}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Movie Overview"
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Popularity</label>
                  <input
                    name="popularity"
                    type="text"
                    value={movieInput.popularity}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Movie Popularity"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Genre</label>
                <input
                  name="tags"
                  type="text"
                  value={movieInput.tags.join(", ")}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Movie Genre"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Poster Path</label>
              <input
                name="poster_path"
                type="text"
                value={movieInput.poster_path}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Movie Poster"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>{" "}
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
