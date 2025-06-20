import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../security';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from '../components';
import RecoverUsernameModal from './modals/RecoverUsernameModal';
import RecoverPasswordModal from './modals/RecoverPasswordModal';
import RegisterModal from './modals/RegisterModal';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openRecoverUsername, setOpenRecoverUsername] = useState(false);
  const [openRecoverPassword, setOpenRecoverPassword] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('El nombre de usuario es requerido'),
      password: Yup.string().required('La contraseña es requerida'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values.username, values.password);
      } catch (error) {
        console.error('Error en inicio de sesión:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Panel izquierdo */}
      {!isMobile && (
        <Grid
          item
          xs={12} md={7}
          sx={{
            background: '#D32F2F',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            padding: 4,
            borderTopRightRadius: '50px',
            gap: 4,
          }}
        >
          <Box component="img" src="/clap-logo.png" alt="Logo" sx={{ width: 300, height: 250, mb: 2 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Sistema de Gestión de Beneficios Brisas del Orinoco II
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Bienvenido al sistema de gestión de beneficios. Accede con tus credenciales para consultar y administrar la información de los beneficiarios de Brisas del Orinoco II.
            </Typography>
          </Box>
        </Grid>
      )}

      {/* Panel derecho - Login */}
      <Grid
        item
        xs={12} md={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: isMobile ? 'white 50%' : 'none',
        }}
      >
        <Box sx={{ px: 14, py: 4, width: '100%', borderRadius: 2, height: '100%' }}>
          {isMobile && (
            <Box component="img" src="/clap-logo.png" alt="Logo" sx={{ width: 200, height: 167, mb: 2, mx: 'auto' }} />
          )}
          <Typography variant="h5"  textAlign="center" fontWeight="bold" gutterBottom>
            Iniciar Sesión
          </Typography>
          <Typography variant="subtitle1" color="text.secondary"  textAlign="center" gutterBottom>
            Ingresa tus credenciales
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button variant="text" size="small" onClick={() => setOpenRecoverUsername(true)}>
                ¿Olvidaste tu usuario?
              </Button>
              <Button variant="text" size="small" onClick={() => setOpenRecoverPassword(true)}>
                ¿Olvidaste tu contraseña?
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                O
              </Typography>
            </Divider>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              ¿No tienes una cuenta?
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setOpenRegister(true)}
            >
              Registrarse
            </Button>
          </Box>
        </Box>
      </Grid>

      <RecoverUsernameModal open={openRecoverUsername} handleClose={() => setOpenRecoverUsername(false)} />
      <RecoverPasswordModal open={openRecoverPassword} handleClose={() => setOpenRecoverPassword(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
    </Grid>
  );
};

export default LoginPage;