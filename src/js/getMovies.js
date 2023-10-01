import axios from 'axios';
import { apiVariables } from './constants';


export const getMovies = async (mode, input, page) => {
  try {
    if (mode === apiVariables.search) {
      if (input !== '') {
        return await axios.get(
          `${apiVariables.BASE_URL}${apiVariables.GET_BY_NAME}?${apiVariables.API_KEY}&query=${input}&page=${page}&per_page=20`,
        );
      }
    }
    if (mode === apiVariables.popular) {
      return await axios.get(`${apiVariables.BASE_URL}${apiVariables.GET_POPULAR}?${apiVariables.API_KEY}&page=${page}&per_page=20`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
