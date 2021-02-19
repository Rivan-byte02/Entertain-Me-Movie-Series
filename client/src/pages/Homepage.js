import React from "react";
import "../component/styles/Homepage.css";
import { useQuery } from "@apollo/client";
import { GET_ALL } from "../config/query";
import { Cards } from "../component/Cards";

export function Homepage() {
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
        backgroundImage:
          "url('https://images5.alphacoders.com/674/thumb-1920-674047.jpg')",
      }}
      className="grid grid-cols-1 gap-20"
    >
      <div className="blur m-20 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-70 border border-gray-200">
        <h1 className="text-4xl font-extrabold font-serif uppercase px-8 py-10 rounded-3xl bg-transparent text-gray-600">
          Movies
        </h1>
        <div
          className="grid grid-cols-3 gap-10 py-5"
          style={{ maxHeight: "1250px", overflowY: "scroll" }}
        >
          {data.movies.map((movie) => {
            return <Cards key={movie._id} movie={movie} />;
          })}
        </div>
      </div>
      <div
        className="m-20 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-70 border border-gray-200"
        style={{ backdropFilter: "blur(20px)" }}
      >
        <h1 className="text-4xl font-extrabold font-serif uppercase px-8 py-10 rounded-3xl bg-transparent text-gray-600">
          Series
        </h1>
        <div
          className="grid grid-cols-3 gap-10 py-5"
          style={{ maxHeight: "1250px", overflowY: "scroll" }}
        >
          {data.series.map((one_series) => {
            return <Cards key={one_series._id} one_series={one_series} />;
          })}
        </div>
      </div>
    </div>
  );
}
