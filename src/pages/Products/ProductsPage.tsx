import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    Button,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';

import ProfileAvatar from '../../components/ProfileAvatar';
import { fetchProducts } from '../../services/api';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Falha ao carregar produtos. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (id: number) => {
        navigate(`/products/${id}`);
    };

    const getStatusColor = (category: string) => {
        const colors: Record<string, "success" | "error" | "info" | "warning" | "default"> = {
            "men's clothing": "success",
            "women's clothing": "error",
            "electronics": "info",
            "jewelery": "warning"
        };
        return colors[category] || "default";
    };

    const formatDate = () => {
        const date = new Date();
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
            <AppBar position="static" sx={{ bgcolor: '#424874' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            Loja do Pierri
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
                {/* Sidebar */}
                <Box
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        borderRight: '1px solid #e0e0e0',
                        bgcolor: 'white',
                        p: 2
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Box sx={{ mb: 1 }}>
                            <ProfileAvatar />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}> Vinicius Damasceno</Typography>
                        <Typography variant="body2" color="text.secondary">Consumidor Assíduo</Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Button
                            fullWidth
                            sx={{
                                justifyContent: 'flex-start',
                                py: 1,
                                mb: 1,
                                color: 'text.secondary'
                            }}
                            startIcon={<DashboardIcon />}
                        >
                            Dashboard
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            disableElevation
                            sx={{
                                justifyContent: 'flex-start',
                                py: 1,
                                bgcolor: '#eceef8',
                                color: '#7579e7',
                                '&:hover': {
                                    bgcolor: '#e4e6f5'
                                }
                            }}
                            startIcon={<InventoryIcon />}
                        >
                            Products
                        </Button>
                    </Box>
                </Box>

                {/* Main content */}
                <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                    <Typography variant="h5" component="h1" gutterBottom fontWeight="500">
                        Products
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {loading ? (
                        <Box display="flex" justifyContent="center" my={8}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f9f9fb' }}>
                                            <TableCell sx={{ fontWeight: 'medium' }}>ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>Image</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>Title</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>Category</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>Price</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>Created at</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((product) => (
                                                <TableRow
                                                    hover
                                                    key={product.id}
                                                    onClick={() => handleRowClick(product.id)}
                                                    sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>{product.id}</TableCell>
                                                    <TableCell>
                                                        <Box
                                                            component="img"
                                                            src={product.image}
                                                            alt={product.title}
                                                            sx={{ width: 40, height: 40, objectFit: 'contain' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{product.title}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            label={product.category}
                                                            color={getStatusColor(product.category)}
                                                            sx={{
                                                                borderRadius: '4px',
                                                                height: '24px',
                                                                fontSize: '0.75rem',
                                                                '& .MuiChip-label': { px: 1 }
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{formatDate()}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProductsPage;