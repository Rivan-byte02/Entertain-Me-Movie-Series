import React from "react";
import "./styles/Cards.css";
import { Link } from "react-router-dom";
import { DELETE_MOVIE } from "../config/mutation";
import { GET_ALL } from "../config/query";
import { useMutation } from "@apollo/client";
import { favoritesVar } from "../config/cache";

export function Cards(props) {
  const input = props.one_series ? props.one_series : props.movie;
  const type = props.one_series ? "series" : "movie";
  const [deleteMovie, { data: message }] = useMutation(DELETE_MOVIE, {
    update(cache, { data: { deleteMovie } }) {
      const currentCache = cache.readQuery({
        query: GET_ALL,
      });

      const newMoviesArray = currentCache.movies.filter(
        (movie) => movie._id !== input._id
      );

      cache.writeQuery({
        query: GET_ALL,
        data: { ...currentCache, movies: [...newMoviesArray] },
      });
    },
  });

  const onDelete = (e, id) => {
    e.preventDefault();
    deleteMovie({
      variables: {
        movieId: id,
      },
    });
  };

  const handleFavorite = () => {
    const currentFavorites = favoritesVar();
    favoritesVar([...currentFavorites, input]);
  };

  return (
    <div className="py-4">
      <div
        className="shadow-lg group container  rounded-md bg-white  max-w-sm flex justify-center items-center  mx-auto content-div"
        style={{ "--image": `url(${input.poster_path})` }}
      >
        <div>
          <div className="w-full image-cover rounded-t-md">
            <div className="p-2 m-4 w-18 h-16 text-center bg-gray-700 rounded-full text-white float-right fd-cl group-hover:opacity-25">
              <span className="text-base tracking-wide font-bold border-b border-white font-sans">
                Pop.
              </span>
              <span className="text-xs tracking-wide font-bold uppercase block font-sans">
                {input.popularity}
              </span>
            </div>
          </div>
          <div className="py-8 px-4 bg-white  rounded-b-md fd-cl group-hover:opacity-25">
            <span className="block text-lg text-gray-800 font-bold tracking-wide">
              {input.title}
            </span>
            <span className="block overview text-gray-600 text-sm">
              {input.overview}
            </span>
          </div>
        </div>
        <div className="absolute opacity-0 fd-sh group-hover:opacity-100">
          <div className="pt-8 text-center flex flex-col gap-4">
            <Link
              className="uppercase px-8 py-2 rounded-full bg-blue-300 text-blue-600 shadow-sm hover:shadow-lg"
              to={`/${type}-detail/${input._id}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>More Detail</span>
            </Link>
            {type === "movie" && (
              <>
                <Link
                  className="uppercase px-8 py-2 rounded-full bg-blue-300 text-blue-600 shadow-sm hover:shadow-lg"
                  to={`/movies/${input._id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span>Update Movie</span>
                </Link>
                <button
                  className="uppercase px-8 py-2 rounded-full bg-blue-300 text-blue-600 shadow-sm hover:shadow-lg"
                  onClick={(e) => onDelete(e, input._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Delete Movie</span>
                </button>
                <button
                  className="uppercase px-8 py-2 rounded-full bg-blue-300 text-blue-600 shadow-sm hover:shadow-lg"
                  onClick={handleFavorite}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>Add to Favorites</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
