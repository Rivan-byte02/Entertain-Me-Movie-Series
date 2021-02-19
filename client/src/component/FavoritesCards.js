import React from "react";
import "./styles/Cards.css";
import { Link } from "react-router-dom";
import { DELETE_MOVIE } from "../config/mutation";
import { GET_ALL, GET_MOVIES } from "../config/query";
import { useMutation } from "@apollo/client";
import { favoritesVar } from "../config/cache";

export function FavoritesCards(props) {
  //   const [deleteMovie, { data: message }] = useMutation(DELETE_MOVIE, {
  //     refetchQueries: [{ query: GET_ALL }, { query: GET_MOVIES }],
  //   });
  const input = props.series ? props.series : props.movie;

  //   const onDelete = (e, id) => {
  //     e.preventDefault();
  //     console.log(id);
  //     deleteMovie({
  //       variables: {
  //         movieId: id,
  //       },
  //     });
  //   };

  //   const handleFavorite = () => {
  //     console.log(input);
  //     const currentFavorites = favoritesVar();
  //     favoritesVar([...currentFavorites, input]);
  //   };

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
            <button className="uppercase px-8 py-2 rounded-full bg-blue-300 text-blue-600 shadow-sm hover:shadow-lg">
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
