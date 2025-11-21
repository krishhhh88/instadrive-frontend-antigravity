import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://instadrive-backend-antigravity.vercel.app/api',
    withCredentials: true, // Important for cookies
});

export const login = async (email: string) => {
    return api.post('/auth/login', { email, password: 'password' });
};

export const logout = async () => {
    return api.post('/auth/logout');
};

export const getMe = async () => {
    return api.get('/auth/me');
};

export const getDriveFiles = async () => {
    return api.get('/drive/files');
};

export const getPosts = async () => {
    return api.get('/posts');
};

export const schedulePost = async (data: any) => {
    return api.post('/posts', data);
};

export const getSettings = async () => {
    return api.get('/settings');
};

export default api;
