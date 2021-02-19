import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_MOVIE } from "../config/mutation";
import { GET_ALL, GET_MOVIE } from "../config/query";
import { useParams } from "react-router-dom";

export function DetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const [movieInput, setMovieInput] = useState({
    title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    tags: [],
  });

  console.log(data.movie);

  useEffect(() => {
    if (data) {
      setMovieInput(data.movie);
    }
  }, [data]);

  if (loading) {
    return <p>Still loading...</p>;
  }

  if (error) {
    return <p>Error : {JSON.stringify(error)}</p>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/8e/d4/25/8ed4250fd8e48fa7ca24a834ba6c3d9d.jpg')",
        minHeight: "100vh",
      }}
      className="text-gray-700 body-font overflow-hidden bg-white"
    >
      <div className="shadow-lg group container rounded-md bg-white bg-opacity-50 my-20 mx-auto p-10 flex justify-center items-center content-div">
        <div className="lg:w-5/6 mx-auto flex flex-wrap">
          {/* <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"> */}
          <img
            src={movieInput.poster_path}
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-48">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-20">
              {movieInput.title}
            </h1>
            <div className="flex mb-4">
              <span className="text-gray-600 ml-3">
                Popularity: {movieInput.popularity}
              </span>
            </div>
            <p className="leading-relaxed text-xl">{movieInput.overview}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex ml-20">
              <h2 className="text-gray-600 text-2xl">Genre: </h2>
              <ul className="flex gap-5 ml-5">
                {movieInput.tags.map((genre) => {
                  return (
                    <li className="text-gray-600 text-xl mt-1">{genre}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
