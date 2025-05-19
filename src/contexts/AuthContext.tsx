// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Efeito para definir o usuário quando o componente monta, se houver token
    useEffect(() => {
        if (token) {
            // Como a API FakeStore não fornece informações do usuário
            // definimos um usuário genérico para demonstração
            setUser({
                id: 1,
                username: 'usuario_autenticado',
                email: 'usuario@exemplo.com'
            });
        }
    }, [token]);

    const handleLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            console.log('Iniciando login...');
            const data = await login(username, password);
            console.log('Login bem-sucedido, dados:', data);
            
            localStorage.setItem('token', data.token);
            setToken(data.token);
            
            // Definir dados simulados do usuário
            const userData = {
                id: 1,
                username: username,
                email: `${username}@exemplo.com`
            };
            
            setUser(userData);
            setIsAuthenticated(true);
            navigate('/products');
        } catch (err: any) {
            console.error('Erro no login:', err);
            setError(err.message || 'Falha no login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                token, 
                user,
                login: handleLogin, 
                logout: handleLogout, 
                loading, 
                error 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};