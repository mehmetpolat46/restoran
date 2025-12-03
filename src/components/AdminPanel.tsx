import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import trLocale from 'date-fns/locale/tr';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import HomeIcon from '@mui/icons-material/Home';



const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [dateRange, setDateRange] = useState('today');

  const handleDateRangeChange = (event: any) => {
    const value = event.target.value;
    setDateRange(value);
    const today = new Date();
    
    switch (value) {
      case 'today':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
        break;
      case 'thisWeek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        setStartDate(startOfWeek);
        setEndDate(today);
        break;
      case 'custom':
        // Custom date range will be handled by DatePicker components
        break;
    }
  };

  const startOfDay = startDate ? new Date(startDate) : null;
  if (startOfDay) startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = endDate ? new Date(endDate) : null;
  if (endOfDay) endOfDay.setHours(23, 59, 59, 999);
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    if (startOfDay && orderDate < startOfDay) return false;
    if (endOfDay && orderDate > endOfDay) return false;
    return true;
  });





  const filteredStats = (() => {
    const stats = {
      totalSales: 0,
      productStats: {} as {
        [key: string]: {
          quantity: number;
          total: number;
          category: string;
        };
      },
    };
    filteredOrders.forEach((order) => {
      stats.totalSales += order.total;
      order.items.forEach((item) => {
        if (!stats.productStats[item.name]) {
          stats.productStats[item.name] = {
            quantity: 0,
            total: 0,
            category: item.category,
          };
        }
        stats.productStats[item.name].quantity += item.quantity;
        stats.productStats[item.name].total += item.price * item.quantity;
      });
    });
    return stats;
  })();





  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USLU DÖNER - Yönetim Paneli
          </Typography>
          <Button
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            Ana Sayfa
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ width: '100%', mb: 2, p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>Kasa</Typography>
          
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Tarih Aralığı</InputLabel>
              <Select
                value={dateRange}
                label="Tarih Aralığı"
                onChange={handleDateRangeChange}
              >
                <MenuItem value="today">Bugün</MenuItem>
                <MenuItem value="yesterday">Dün</MenuItem>
                <MenuItem value="thisWeek">Bu Hafta</MenuItem>
                <MenuItem value="custom">Özel Aralık</MenuItem>
              </Select>
            </FormControl>

            {dateRange === 'custom' && (
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                <DatePicker
                  label="Başlangıç Tarihi"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
                <DatePicker
                  label="Bitiş Tarihi"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            )}
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ürün Adı</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell align="right">Satış Adedi</TableCell>
                  <TableCell align="right">Toplam Tutar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(filteredStats.productStats).map(([name, data]) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell align="right">{data.quantity}</TableCell>
                    <TableCell align="right">{data.total}₺</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="h6">Toplam</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">
                      {Object.values(filteredStats.productStats).reduce((sum, data) => sum + data.quantity, 0)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">{filteredStats.totalSales}₺</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Toplam Ekmek: {
                        Object.entries(filteredStats.productStats).reduce((sum, [name, data]) => {
                          if (
                            data.category === 'İçecekler & Atıştırmalık' ||
                            data.category === 'Takolar' ||
                            name.toLowerCase().includes('tako')
                          ) return sum;
                          let ekmek = 1;
                          if (name.toLowerCase().includes('maksi')) ekmek = 2;
                          return sum + ekmek * data.quantity;
                        }, 0)
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminPanel; 