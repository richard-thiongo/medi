import axios from "axios";
const API = process.env.REACT_APP_API_URL;

class AllocationApi {
  async getAllocations() {
    try {
      const response = await axios.get(`${API}/allocations/get_all_allocations`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("admin")).access_token
          }`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async allocateNurse(allocateData) {
    try {
      const response = await axios.post(
        `${API}/allocations/allocate`,
        allocateData,
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

  
}

export default new AllocationApi();
