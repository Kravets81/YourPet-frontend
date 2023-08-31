import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// api який треба вставити для запитів за користувачами !!!!!!!!!!!!!!!!!!!!!!!!!!
axios.defaults.baseURL = 'https://your-pet-api-a9zk.onrender.com';

const errMessage = 'Something went wrong. Please try again';

//  --- ADD JWT ---
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// --- REMOWE JWT ---
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// //  --- REGISTER / POST ----
// //  credentials: { name, email, password }
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/users/register', credentials);
      setAuthHeader(data.token);
      //response.data is {message: 'New account created'} but must be ...
      console.log('Answer', data);
      return data;
    } catch (e) {
      toast.error(errMessage);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

//  ---- LOGIN / POST ----
//  credentials: {email, password}
export const login = createAsyncThunk(
  'auth/login',
  async (credential, thunkAPI) => {
    try {
      console.log('Credentials', credential);
      const response = await axios.post('/api/users/login', credential);
      console.log('Answer', response);
      // After successful login, add the token to the HTTP header
      setAuthHeader(response.token);
      //data must include {name, token, ...}
      return response.data;
    } catch (error) {
      toast.error(errMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ---- LOGOUT / POST ---
// headers: Authorization: Bearer token
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/api/users/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    toast.error(errMessage);
    return thunkAPI.rejectWithValue(error.message);
  }
});

//  GET @ /users/current
//  headers: Authorization: Bearer token
export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (__, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    if (!token) {
      return rejectWithValue('Unable to fetch user');
    }
    setAuthHeader(token);
    try {
      const { data } = await axios.get('/api/users/current');
      return data;
    } catch (error) {
      toast.error(errMessage);
      return rejectWithValue(error.message);
    }
  }
);

//  PUT
export const updateUser = createAsyncThunk(
  'pets/updateUser',
  async (userData, { rejectWithValue }) => {
    console.log('Entry Data User', userData);
    try {
      const { data } = await axios.put(`/api/users/update`, userData);
      console.log('Data User', data);
      return data;
    } catch (error) {
      toast.error(errMessage);
      return rejectWithValue(error.message);
    }
  }
);
//  PUT
export const updateAvatars = createAsyncThunk(
  'pets/updateAvatars',
  async (userData, { rejectWithValue }) => {
    console.log('Entry Data Avatars', userData);
    try {
      const { data } = await axios.put(`/api/users/avatars`, userData);
      console.log('Data Avatar', data);
      return data;
    } catch (error) {
      toast.error(errMessage);
      return rejectWithValue(error.message);
    }
  }
);

export const hideModalSuccessRegister = createAsyncThunk(
  'auth/hideModalSuccessRegister',
  async (_, __) => {
    return false;
  }
);
