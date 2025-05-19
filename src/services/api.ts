// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor para tratar respostas da API
api.interceptors.response.use(
    response => response,
    error => {
        // Se receber erro 401 (não autorizado), significa que o token expirou ou é inválido
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Redirecionar para login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const login = async (username: string, password: string) => {
    try {
        console.log('Tentando login com:', { username, password });
        
        const response = await api.post('/auth/login', { username, password });
        console.log('Resposta de login:', response.data);
        
        // Verificar se a resposta contém um token
        if (!response.data || !response.data.token) {
            throw new Error('Token não recebido da API');
        }
        
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export default api;