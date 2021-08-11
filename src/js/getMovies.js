import axios from "axios";
import { BASE_URL } from "./constants";
import { API_KEY } from './constants';
import { GET_BY_NAME } from './constants';
import { GET_POPULAR } from './constants';
import { MODE } from "./constants";

export const getMovies = async (mode, input) => {
  try {
    if (mode === MODE.search) {
      if (input !== "") {
         return await axios.get(`${BASE_URL}${GET_BY_NAME}?${API_KEY}&query=${input}`);
      }
    }
    if (mode === MODE.popular) {
       return await axios.get(`${BASE_URL}${GET_POPULAR}?${API_KEY}`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

