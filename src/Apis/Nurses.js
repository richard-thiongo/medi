import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

class NurseApi {
  async getNurses() {
    try {
      const response = await axios.get(`${BASE_URL}nurse/viewall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin").access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getNurseById(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}nurse/viewsingle`,
        { nurse_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("admin")).access_token
            }`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getNurseAllocations(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}allocations/get_nurse_allocations`,
        { nurse_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("admin")).access_token
            }`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

async addNurse(nurseData) {
    try {
      const response = await axios.post(
        `${BASE_URL}nurse/register`,
        nurseData,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("admin")).access_token
            }`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error);
      throw error;
    }
}


async updateNurse(nurseData) {
  try {
    const response = await axios.put(
      `${BASE_URL}nurse/update`,
      nurseData,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("admin")).access_token
          }`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}
}

  

export default new NurseApi();
