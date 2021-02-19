import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL } from "../config/query";
import { Link } from "react-router-dom";
import { Cards } from "../component/Cards";

export function Series() {
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
          "url('https://i.pinimg.com/originals/9a/f5/3d/9af53dbe18a62c85c0d66b03cfd8a781.jpg')",
        minHeight: "100vh",
      }}
      className="grid grid-cols-1"
    >
      <div className="m-20 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-50 border border-gray-200">
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
