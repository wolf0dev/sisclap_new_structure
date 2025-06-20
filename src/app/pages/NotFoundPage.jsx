import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import { Button } from '../components';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <FileQuestion size={100} color="#FF4040" />
        
        <Typography variant="h1" component="h1" sx={{ mt: 4, fontWeight: 'bold', fontSize: { xs: '4rem', md: '6rem' } }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" sx={{ mt: 2, mb: 4 }}>
          Página no encontrada
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;