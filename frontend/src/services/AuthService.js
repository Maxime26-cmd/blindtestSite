import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const signup = (email, password) => {
  return axios.post(API_URL + 'signup', { email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

const AuthService = {
  signup,
  login,
};

export default AuthService;
