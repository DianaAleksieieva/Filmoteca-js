import axios from 'axios';
import { BASE_URL } from './constants';
import { API_KEY } from './constants';
import { GET_BY_NAME } from './constants';
import { GET_POPULAR } from './constants';
import { MODE } from './constants';

export const getMovies = async (mode, input, page) => {
  try {
    if (mode === MODE.search) {
      if (input !== '') {
        return await axios.get(
          `${BASE_URL}${GET_BY_NAME}?${API_KEY}&query=${input}&page=${page}&per_page=20`,
        );
      }
    }
    if (mode === MODE.popular) {
      return await axios.get(`${BASE_URL}${GET_POPULAR}?${API_KEY}&page=${page}&per_page=20`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
