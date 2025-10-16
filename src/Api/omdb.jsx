import axios from "axios";

// Create Axios instance with HTTPS baseURL
const Api = axios.create({
  baseURL: "https://www.omdbapi.com",
});

// Fetch movie data by search term
export const getMovieData = (name) => {
  return Api.get("/", {
    params: {
      s: name,
      apikey:  import.meta.env.VITE_ODMID_API_KEY, 
    },
  });
};
// console.log(import.meta.env.VITE_ODMID_API_KEY);

// Fetch movie details by IMDb ID
export const getMovieDetail = (imdbID) => {
  return Api.get("/", {
    params: {
      i: imdbID,
      apikey:  import.meta.env.VITE_ODMID_API_KEY, 
      plot: "full",
    },
  });
};