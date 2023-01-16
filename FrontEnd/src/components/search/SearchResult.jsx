import React, { useState, useEffect } from "react";

import requests from "../../utils/requests";

import "./SearchResult.css";

const author = "user=User_01&token=8qlOkxz4wq";

const base_url = "https://image.tmdb.org/t/p/original";

const SearchResult = ({ query }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    function sendKey(query) {
      fetch(`http://localhost:5000/api/movies/search?${author}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: query.key, getDetail: query.detail }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // xuất ra respond của BE (có thể là kết quả hoặc thông báo lỗi 400)
          if (data.results) {
            setMovies(data.results); // nhận kết quả từ BE trả về sau khi đã Post body lên BE
          } else {
            setMovies([]); // nếu kết quả trả về lỗi thì set rỗng
          }
        });
    }
    sendKey(query);
  }, [query]); // khi nào 1 trong các thành phần trong query thay đổi (key hoặc detail) thì sẽ chạy lại useEffect

  return (
    <div className="row">
      <h2>Search Result</h2>
      <div className="row_posters search-resul-container sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
