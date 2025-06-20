import api from './api';

const apiDelete = async (endpoint, id) => {
  try {
    const url = `${endpoint}/${id}`;
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data from ${endpoint}/${id}:`, error);
    throw error;
  }
};

export default apiDelete;