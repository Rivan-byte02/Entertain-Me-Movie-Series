import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FAVORITES } from "../config/query";
import { FavoritesCards } from "../component/FavoritesCards";

export function Favorites() {
  const { data, loading, error } = useQuery(GET_FAVORITES);

  if (loading) return <p>Loading data...</p>;

  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  console.log(data);

  return (
    <div
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/3132280.png')",
        minHeight: "100vh",
      }}
      className="grid grid-cols-1"
    >
      <div className="blur m-20 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-70 border border-gray-200">
        <h1 className="text-4xl font-extrabold font-serif uppercase px-8 py-10 rounded-3xl bg-transparent text-gray-600">
          Favorites List
        </h1>
        <div
          className="grid grid-cols-1 gap-10 py-5"
          style={{ maxHeight: "1250px", overflowY: "scroll" }}
        >
          {data && data.favorites.length === 0 ? (
            <p className="text-4xl font-extrabold font-serif uppercase px-8 py-52 rounded-3xl bg-transparent text-gray-600">
              No favorites has been add
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-10">
              {data.favorites.map((movie) => {
                return <FavoritesCards key={movie._id} movie={movie} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
