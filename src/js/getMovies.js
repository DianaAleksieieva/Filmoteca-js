import axios from "axios";
import { BASE_URL } from "./constants";
import { API_KEY } from './constants';
import { GET_BY_NAME } from './constants';
import { GET_POPULAR } from './constants';
import { MODE } from "./constants";
let data = [];
export const getMovies = async (mode, input) => {
  try {
    if (mode === MODE.search) {
      if (input !== "") {
        const response =  await axios.get(`${BASE_URL}${GET_BY_NAME}?${API_KEY}&query=${input}`);
       const moveis = response.data.results;
        for (const movie of moveis) {
         movie.release_date = movie.release_date.slice(0, 4);
      }  
      return moveis;
      }
    }
    if (mode === MODE.popular) {
      const response = await axios.get(`${BASE_URL}${GET_POPULAR}?${API_KEY}`);
      const moveis = response.data.results;
      for (const movie of moveis) {
         movie.release_date = movie.release_date.slice(0, 4);
      }  
      return moveis;
    }
  } catch (error) {
    console.log(error.message);
  }
}

