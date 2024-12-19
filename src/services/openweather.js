import axios from 'axios';

const API_KEY = '7399a837f1038a2856f98b22546ff3e4';

export const searchPlaces = async (query) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        appid: API_KEY,
        limit: 5,
        q: query,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};