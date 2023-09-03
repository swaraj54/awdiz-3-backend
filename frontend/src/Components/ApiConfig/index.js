import axios from 'axios';


const token = JSON.parse(localStorage.getItem("token"))

if (token) {
    var api = axios.create({
        baseURL: 'https://awdiz-3-backend.onrender.com/api/v1',
        headers: { 'Authorization': `Bearer ${token}` }
    })
} else {
    var api = axios.create({
        baseURL: 'https://awdiz-3-backend.onrender.com/api/v1'
    })
}

export default api

