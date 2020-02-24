import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

const createUser = ({ fullName, username, email, password }) => 
  http.post('/login', { fullName, username, email, password })
  
const login = ({ email, password }) => 
  http.post('/login', { email, password })
  
const logout = () => http.post('/logout')

export default {
  login,
  logout,
  createUser
}
