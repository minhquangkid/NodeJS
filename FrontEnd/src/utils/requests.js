const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";
const author = "user=User_01&token=8qlOkxz4wq";
const requests = {
  fetchTrending: `http://localhost:5000/api/movies/trending?${author}`,
  fetchNetflixOriginals: `http://localhost:5000/api/movies/discover?type=12&${author}`,
  fetchTopRated: `http://localhost:5000/api/movies/top-rate?${author}`,
  fetchActionMovies: `http://localhost:5000/api/movies/discover?type=28&${author}`,
  fetchComedyMovies: `http://localhost:5000/api/movies/discover?type=35&${author}`,
  fetchHorrorMovies: `http://localhost:5000/api/movies/discover?type=27&${author}`,
  fetchRomanceMovies: `http://localhost:5000/api/movies/discover?type=10749&${author}`,
  fetchDocumentaries: `http://localhost:5000/api/movies/discover?type=99&${author}`,
  fetchSearch: `http://localhost:5000/api/movies/search?${author}`,
};

export default requests;

///trending/all/week?api_key=${504b85f6fe0a10a9c7f35945e14e7ddf}&language=en-US
//https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`
