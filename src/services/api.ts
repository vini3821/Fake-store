import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com'
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const login = async (username: string, password: string) => {
    const validCredentials = {
        username: 'admin123',
        password: '123admin'
    };

    try {
        // Verificação local em vez de chamada API
        if (username === validCredentials.username && password === validCredentials.password) {
            // Retorna um token simulado
            return { token: 'token-simulado-123456' };
        } else {
            throw new Error('Credenciais inválidas');
        }
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