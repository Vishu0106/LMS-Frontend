import axios from 'axios'

const BASE_URL = 'https://lms-backend-project.onrender.com/api/v1'
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials= true;
axiosInstance.defaults.timeout = 8500;

export default axiosInstance;