import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

class MembersApi {
  async getMembers() {
    try {
      const response = await axios.get(`${BASE_URL}members/getmembers`, {
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

  async getMemberById(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}members/profile`,
        { member_id: id },
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

  async getMemberDependants(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}dependant/view`,
        { member_id: id },
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


  async getDependantById(id) {
    try {
      const response = await axios.post(
        `${BASE_URL}dependant/getdependantbyid`,
        { dependant_id: id },
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



  async countMembersAndDependants() {
    try {
      const response = await axios.get(`${BASE_URL}members/countmembers`, {
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
}

export default new MembersApi();
