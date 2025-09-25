import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

class BookingsApi {
  async getallBookings() {
    try {
      const response = await axios.get(`${BASE_URL}booking/view_all`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("admin")).access_token
          }`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default new BookingsApi();
