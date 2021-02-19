import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL } from "../config/query";
import { Link } from "react-router-dom";
import { Cards } from "../component/Cards";

export function Movies() {
  const { data, loading, error } = useQuery(GET_ALL);

  if (loading) {
    return <p>Still loading...</p>;
  }

  if (error) {
    return <p>Error : {JSON.stringify(error)}</p>;
  }

  return (
    <div
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp3171493.jpg')",
        minHeight: "100vh",
      }}
      className="grid grid-cols-1"
    >
      <div className="blur m-20 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-50 border border-gray-200">
        <Link
          className="uppercase px-8 py-2 rounded-full bg-gray-200 text-gray-600 shadow-sm hover:shadow-lg"
          to="/movies/add"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Add Movie</span>
        </Link>
        <div
          className="grid grid-cols-3 gap-10 py-5"
          style={{ maxHeight: "1250px", overflowY: "scroll" }}
        >
          {data.movies.map((movie) => {
            return <Cards key={movie._id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
}
