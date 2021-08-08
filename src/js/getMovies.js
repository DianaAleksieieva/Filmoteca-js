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
        const response =  await axios.get(`${BASE_URL}${GET_BY_NAME}?${API_KEY}&query=${input}`);
        return response.data.results;
      }
    }
    if (mode === MODE.popular) {
      const response = await axios.get(`${BASE_URL}${GET_POPULAR}?${API_KEY}`);
      return response.data.results;
    }
  } catch (error) {
    console.log(error.message);
  }
}

