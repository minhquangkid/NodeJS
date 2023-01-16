import React from "react";
import YouTube from "react-youtube";

import "./MovieDetail.css";

function onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};

const MovieDetail = ({ movieTrailer, movieData }) => {
  const { release_date, title, name, overview, vote_average } = movieData;

  return (
    <div className="movie_detail">
      <div className="movie_detail_data">
        <h1>{title || name}</h1>
        <hr></hr>

        <h3>Release Date: {release_date}</h3>
        <h3>Vote: {vote_average} / 10</h3>
        <br></br>
        <p>{overview}</p>
      </div>
      <div className="movie_detail_trailer">
        <YouTube videoId={movieTrailer.key} opts={opts} onReady={onReady} />
      </div>
    </div>
  );
};
// thuộc tính là videoId nhưng lại lấy key chứ ko phải id của API
export default MovieDetail;
