// We define the authentication functions like login, register, logout
// We use axios to make the requests
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

class AuthApi {
  async Adminlogin(email, password) {
    try {
      const reponse = await axios.post(`${API}admin/login`, {
        email,
        password,
      });
      return reponse.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new AuthApi();