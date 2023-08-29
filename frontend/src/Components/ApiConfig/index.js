import axios from 'axios';


const token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL: 'http://localhost:8002',
    headers: { 'Authorization': `Bearer ${token}` }
})

export default api;