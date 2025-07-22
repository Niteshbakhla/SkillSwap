import axios from "axios";

const axiosinstance = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api`,
            withCredentials: true
})

export default axiosinstance;