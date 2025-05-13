import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    Divider,
    AppBar,
    Toolbar,
    Alert,
    Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchProductById } from '../../services/api';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await fetchProductById(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error(`Failed to fetch product ${id}:`, err);
                setError('Falha ao carregar detalhes do produto. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        getProductDetails();
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Fake Store
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>
                <Button
                    component={Link}
                    to="/products"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                >
                    Voltar para produtos
                </Button>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box display="flex" justifyContent="center" my={8}>
                        <CircularProgress />
                    </Box>
                ) : product ? (
                    <Card sx={{ overflow: 'visible' }}>
                        <Box sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Box
                                sx={{
                                    width: { xs: '100%', md: '40%' },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 2
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        maxHeight: 400,
                                        objectFit: 'contain',
                                        maxWidth: '100%'
                                    }}
                                    image={product.image}
                                    alt={product.title}
                                />
                            </Box>

                            <CardContent sx={{ width: { xs: '100%', md: '60%' } }}>
                                <Chip
                                    label={product.category}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 2 }}
                                />

                                <Typography variant="h4" component="h1" gutterBottom>
                                    {product.title}
                                </Typography>

                                {product.rating && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Rating value={product.rating.rate} precision={0.1} readOnly />
                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                            ({product.rating.count} avaliações)
                                        </Typography>
                                    </Box>
                                )}

                                <Typography variant="h4" color="primary" sx={{ my: 2 }}>
                                    R$ {product.price.toFixed(2)}
                                </Typography>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Descrição
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    {product.description}
                                </Typography>

                                <Box sx={{ mt: 4 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                    >
                                        Adicionar ao Carrinho
                                    </Button>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                ) : (
                    <Alert severity="warning">
                        Produto não encontrado.
                    </Alert>
                )}
            </Container>
        </>
    );
};

export default ProductDetailPage;