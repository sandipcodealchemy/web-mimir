import { BASE_URL } from "@/constants/ApiConstant";
import axios from "axios";

const Api = axios.create({
    // timeout: 20000,
    withCredentials: true,
    baseURL: BASE_URL
  });

  export default Api

