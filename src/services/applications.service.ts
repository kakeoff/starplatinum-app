import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


export async function getAllApplications() {
  try {
    const res = await axios.get(`${BASE_URL}/applications`);
      res.data.forEach((item) => {
        item.pubs = JSON.parse(item.pubs)
      })
      console.log(res)
      return res
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function sendApplication(data) {
  try {
    const res = await axios.post(`${BASE_URL}/applications`, data);
    res.data.pubs = JSON.parse(res.data.pubs)
      return res
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function deleteApplication(applicationId: number) {
  try {
    await axios.delete(`${BASE_URL}/applications/${applicationId}`);
  } catch (error) {
    return Promise.reject(error)
  }
}
