import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

class LabApi {
  async getLabs() {
    try {
      const response = await axios.get(`${BASE_URL}lab/getLabs`, {
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

  async getLabById(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}lab/profile`,
        { lab_id: id },
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

  async getAllTests() {
    try {
      const response = await axios.get(`${BASE_URL}lab/get_all_tests`, {});
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async geTestsPerMonth() {
    try {
      const response = await axios.get(
        `${BASE_URL}lab/get_tests_per_month`,
        {}
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getlabTests(id) {
    try {
      const response =await axios.post(
        `${BASE_URL}lab/get_tests`,
        { lab_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("admin")).access_token
            }`,
          },
        }
      );
      console.log("why is undefine", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new LabApi();
