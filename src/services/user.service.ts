import axios from '../js/plugins/index';

export async function getMe() {
  try {
    const response = await axios.get(`/user/me`);
    return response.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }
