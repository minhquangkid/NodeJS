import React, { useState, useEffect } from "react";
import axios from "axios";
//import movieTrailer from "movie-trailer";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const author = "user=User_01&token=8qlOkxz4wq";
const base_url = "https://image.tmdb.org/t/p/original";
//const movies_limit = 10;

function MovieList({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // xem thêm trong https://www.npmjs.com/package/axios
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const sendId = (id) => {
    fetch(`http://localhost:5000/api/movies/video?${author}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTrailerUrl(data);
        //console.log(data);
      }); // nhận kết quả từ BE trả về sau khi đã Post body lên BE
  };

  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
    } else {
      sendId(movie.id); // gửi API chứa ID lên cho BE
      setSelectedMovie(movie);
      // movieTrailer(movie?.title || "") // movieTrailer được import từ thư viện ngoài (xem file package.json)
      //   // https://www.npmjs.com/package/movie-trailer
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(urlParams.get("v"));
      //   })
      //   .catch((error) => console.log(error));
    }
  };

  movies.sort((a, b) => b.popularity - a.popularity); // sắp xếp theo điểm popularity của phim giảm dần
  //movies.splice(movies_limit); // chỉ lấy số phần tử trong mảng là movies_limit, còn lại phía sau dư thì bỏ

  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
        )}
      </div>
    </div>
  );
}

export default MovieList;
