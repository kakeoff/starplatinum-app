import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


export async function getAllPublications() {
  try {
    const res = await axios.get(`${BASE_URL}/publications`);
      return res
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createPublication(data) {
  try {
    const res = await axios.post(`${BASE_URL}/publications`, data);
      return res
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function deletePublication(id: number) {
  try {
    await axios.delete(`${BASE_URL}/applications/${id}`);
  } catch (error) {
    return Promise.reject(error)
  }
}
