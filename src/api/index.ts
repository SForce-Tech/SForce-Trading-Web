import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

apiClient.interceptors.request.use(
  config => {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    if (username && password) {
      const token = btoa(`${username}:${password}`);
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const login = async (username: string, password: string) => {
  const response = await apiClient.post('/users/login', { username, password });
  return response.data;
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users/listAll');
    console.log('Full API response:', response);
    console.log('API response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  const response = await apiClient.get('/users/find', { params: { email } });
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await apiClient.post('/users/register', user);
  return response.data;
};
