// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, token } = useAuth();

    // Adiciona verificações de debug
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    console.log('ProtectedRoute - token:', token ? 'Token existe' : 'Token não existe');

    if (!isAuthenticated || !token) {
        console.log('Redirecionando para /login...');
        return <Navigate to="/login" replace />;
    }

    console.log('Acesso permitido a rota protegida');
    return <Outlet />;
};

export default ProtectedRoute;