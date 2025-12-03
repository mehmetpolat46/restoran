import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Divider,
  Paper,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Badge,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OrderCompleteModal from './OrderCompleteModal';
import { CartItem } from '../types';

interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}



const categories = [
  'Hatay Usulü Dönerler',
  'Klasik Dönerler',
  'Takolar',
  'Porsiyonlar',
  'Menüler',
  'İçecekler & Atıştırmalık',
];

const products: Product[] = [
  // Hatay Usulü Dönerler
  {
    id: 1,
    name: 'Hatay Usulü TAVUK Eko Döner',
    price: 120,
    category: 'Hatay Usulü Dönerler',
  },
  {
    id: 2,
    name: 'Hatay Usulü TAVUK Normal Döner',
    price: 140,
    category: 'Hatay Usulü Dönerler',
  },
  {
    id: 3,
    name: 'Hatay Usulü TAVUK Maksi Döner',
    price: 180,
    category: 'Hatay Usulü Dönerler',
  },
  {
    id: 4,
    name: 'Hatay Usulü ET Eko Döner',
    price: 220,
    category: 'Hatay Usulü Dönerler',
  },
  {
    id: 5,
    name: 'Hatay Usulü ET Normal Döner',
    price: 260,
    category: 'Hatay Usulü Dönerler',
  },
  {
    id: 6,
    name: 'Hatay Usulü ET Maksi Döner',
    price: 320,
    category: 'Hatay Usulü Dönerler',
  },
  {
    id: 'hud-lavas',
    name: 'Ekstra Lavaş',
    price: 15,
    category: 'Hatay Usulü Dönerler',
  },

  // Klasik Dönerler
  {
    id: 7,
    name: 'Klasik TAVUK Eko Döner',
    price: 120,
    category: 'Klasik Dönerler',
  },
  {
    id: 8,
    name: 'Klasik TAVUK Normal Döner',
    price: 140,
    category: 'Klasik Dönerler',
  },
  {
    id: 9,
    name: 'Klasik ET Eko Döner',
    price: 220,
    category: 'Klasik Dönerler',
  },
  {
    id: 10,
    name: 'Klasik ET Normal Döner',
    price: 260,
    category: 'Klasik Dönerler',
  },
  {
    id: 'hud-lavas',
    name: 'Ekstra Lavaş',
    price: 15,
    category: 'Klasik Dönerler',
  },

  // Takolar
  {
    id: 11,
    name: 'TAVUK Tekli Tako',
    price: 90,
    category: 'Takolar',
  },
  {
    id: 12,
    name: 'TAVUK İkili Tako',
    price: 160,
    category: 'Takolar',
  },
  {
    id: 13,
    name: 'ET Tekli Tako',
    price: 150,
    category: 'Takolar',
  },
  {
    id: 14,
    name: 'ET İkili Tako',
    price: 280,
    category: 'Takolar',
  },
  {
    id: 15,
    name: 'Karışık Combo Tako',
    price: 220,
    category: 'Takolar',
  },
  

  // Porsiyonlar
  {
    id: 16,
    name: 'TAVUK Döner Porsiyon',
    price: 200,
    category: 'Porsiyonlar',
  },
  {
    id: 17,
    name: 'Pilav Üstü TAVUK Döner Porsiyon',
    price: 220,
    category: 'Porsiyonlar',
  },
  {
    id: 18,
    name: 'ET Döner Porsiyon',
    price: 350,
    category: 'Porsiyonlar',
  },
  {
    id: 19,
    name: 'Pilav Üstü ET Döner Porsiyon',
    price: 370,
    category: 'Porsiyonlar',
  },
  {
    id: 'hud-lavas',
    name: 'Ekstra Lavaş',
    price: 15,
    category: 'Porsiyonlar',
  },

  // Menüler
  {
    id: 20,
    name: 'TAVUK Döner Menü',
    price: 200,
    category: 'Menüler',
  },
  {
    id: 21,
    name: 'ET Döner Menü',
    price: 320,
    category: 'Menüler',
  },
  {
    id: 'm-lavas',
    name: 'Ekstra Lavaş',
    price: 15,
    category: 'Menüler',
  },

  // İçecekler & Atıştırmalık
  {
    id: 22,
    name: 'Ayran',
    price: 40,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 23,
    name: 'Kutu İçecekler',
    price: 50,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 24,
    name: 'Şalgam',
    price: 40,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 25,
    name: 'Soda',
    price: 25,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 26,
    name: 'Su',
    price: 15,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 27,
    name: 'Külahta Patates Kızartması',
    price: 50,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 28,
    name: 'Antep Usulü Katmer Tatlısı',
    price: 140,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 29,
    name: '1 LT Kola ',
    price: 75,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 30,
    name: '1 LT Ayaran',
    price: 75,
    category: 'İçecekler & Atıştırmalık',
  },
  {
    id: 31,
    name: '2,5 LT Kola',
    price: 95,
    category: 'İçecekler & Atıştırmalık',
  },

  {
    id: 'drink-2',
    name: 'Servis Patates',
    price: 70,
    category: 'İçecekler & Atıştırmalık',
    image: 'https://via.placeholder.com/150',
  },
 
];



const OrderScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderType = searchParams.get('type') === 'delivery' ? 'delivery' : 'dine-in';
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string | number, number>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleQuantityChange = (productId: string | number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change),
    }));
  };

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity === 0) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    setQuantities((prev) => ({
      ...prev,
      [product.id]: 0,
    }));
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = orderType === 'delivery' ? calculateDeliveryFee() : 0;
    return subtotal + deliveryFee;
  };

  const calculateDeliveryFee = () => {
    if (orderType !== 'delivery') return 0;

    let fee = 0;

    cart.forEach(item => {
      const quantity = item.quantity || 1;

      if (item.name.toLowerCase().includes('lavaş')) {
        return; // Skip lavaş items
      }

      if (['Hatay Usulü Dönerler', 'Klasik Dönerler', 'Takolar', 'Porsiyonlar', 'Menüler'].includes(item.category)) {
        fee += (20 * quantity); // Her ana ürün için 20 TL
      } else if (item.category === 'İçecekler & Atıştırmalık') {
        fee += (10 * quantity); // Her içecek için 10 TL
      }
    });

    return fee;
  };

  const handleComplete = () => {
    setCart([]);
    setQuantities({});
    setShowSuccessMessage(true);
  };



  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ minHeight: '64px' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.1rem', color: orderType === 'delivery' ? 'primary.main' : 'error.main' }}>
            USLU DÖNER – {orderType === 'dine-in' ? 'İçeride' : 'Kurye'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              size="small"
              sx={{ fontSize: '0.8rem' }}
              color={orderType === 'delivery' ? 'primary' : 'error'}
            >
              Ana Sayfa
            </Button>
            <IconButton color="inherit" size="small">
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* Left side - Categories and Products */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'contained' : 'outlined'}
                  onClick={() => setSelectedCategory(category)}
                  sx={{ 
                    minWidth: '120px',
                    height: '40px',
                    fontSize: '0.9rem'
                  }}
                  color={orderType === 'delivery' ? 'primary' : 'error'}
                >
                  {category}
                </Button>
              ))}
            </Box>

            <Grid container spacing={1}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontSize: '1rem' }}>{product.name}</Typography>
                      <Typography color="textSecondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {product.price}₺
                      </Typography>
                      {product.description && (
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{product.description}</Typography>
                      )}
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton
                          onClick={() => handleQuantityChange(product.id, -1)}
                          disabled={!quantities[product.id]}
                          size="small"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={quantities[product.id] || 0}
                          size="small"
                          sx={{ width: 50, mx: 1 }}
                          inputProps={{ 
                            readOnly: true,
                            style: { textAlign: 'center', fontSize: '1rem' }
                          }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(product.id, 1)}
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>
                        <Button
                          variant="contained"
                          onClick={() => addToCart(product)}
                          disabled={!quantities[product.id]}
                          sx={{ ml: 1, fontSize: '0.8rem' }}
                          color={orderType === 'delivery' ? 'primary' : 'error'}
                        >
                          Ekle
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right side - Cart */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, height: 'calc(100vh - 120px)', position: 'sticky', top: '20px', overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 600, color: orderType === 'delivery' ? 'primary.main' : 'error.main' }}>
                🛒 Sepet
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {cart.length === 0 ? (
                <Typography color="textSecondary" align="center" sx={{ py: 4, fontSize: '0.9rem' }}>
                  Sepetiniz boş.
                  <br />
                  Lütfen sol taraftan ürün seçin.
                </Typography>
              ) : (
                <>
                  {cart.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.8rem' }}>
                          {item.quantity} x {item.price}₺
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1, fontSize: '0.9rem', fontWeight: 500 }}>
                          {item.quantity * item.price}₺
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ p: 0.5 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 600, color: orderType === 'delivery' ? 'primary.main' : 'error.main' }}>
                    Toplam: {calculateTotal()}₺
                  </Typography>
                  {orderType === 'delivery' && (
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: '0.8rem' }}>
                      * Kurye ücreti dahildir
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={cart.length === 0}
                    startIcon={<PrintIcon />}
                    onClick={() => setShowCompleteModal(true)}
                    sx={{ mt: 2, py: 1.5, fontSize: '0.9rem' }}
                    color={orderType === 'delivery' ? 'primary' : 'error'}
                  >
                    Siparişi Tamamla
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <OrderCompleteModal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        orderType={orderType}
        cart={cart}
        total={calculateTotal()}
        onComplete={handleComplete}
      />

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Sipariş başarıyla kaydedildi!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderScreen; 
