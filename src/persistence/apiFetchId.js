import api from './api';

const apiFetchId = async (endpoint, id) => {
  try {
    const url = `${endpoint}/${id}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}/${id}:`, error);
    throw error;
  }
};

export default apiFetchId;