import api from './api';

const apiUpdate = async (endpoint, id, data) => {
  try {
    const url = id ? `${endpoint}/${id}` : endpoint;
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};

export default apiUpdate;