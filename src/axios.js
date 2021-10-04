import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://pyploto-db.herokuapp.com/api/',
    timeout: 5000,
    headers: {
        "Authorization": "JWT " + localStorage.getItem('access_token'),
        "Content-Type": "application/json",
        "accept": "application/json"
    }    
})

// axiosInstance.interceptors.response.use(response => response,
//     error => {
//         const originalRequest = error.config
//         if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
//             return axiosInstance
//             .post('/token/refresh/', {
//                 'refresh': localStorage.getItem('refresh_token')
//             })
//             .then(res => {
//                 localStorage.setItem('access_token', res.data.access)
//                 localStorage.setItem('refresh_token', res.data.refresh)
//                 axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`

//                 originalRequest['Authorization'] = `JWT ${res.data.access}`

//                 return axiosInstance(originalRequest)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         }
//         return Promise.reject(error)
//     }

// )
export default axiosInstance;