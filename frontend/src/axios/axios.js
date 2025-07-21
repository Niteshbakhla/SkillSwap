import axios from "axios";

const axiosinstance = axios.create({
            baseURL: `https://skillswap-6weo.onrender.com/api`,
            withCredentials: true
})

export default axiosinstance;