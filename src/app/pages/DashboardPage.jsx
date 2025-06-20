import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Paper,
  Divider
} from '@mui/material';
import { 
  Users, 
  UserPlus, 
  FileText, 
  UserX
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../security';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cards = [
    {
      title: 'Beneficiarios',
      description: 'Gestionar beneficiarios del sistema',
      icon: <Users size={40} />,
      path: '/dashboard/beneficiarios',
      color: '#FF4040',
    },
    {
      title: 'Dependientes',
      description: 'Gestionar dependientes de beneficiarios',
      icon: <UserPlus size={40} />,
      path: '/dashboard/dependientes',
      color: '#FF6B6B',
    },
    {
      title: 'Beneficiarios Inactivos',
      description: 'Ver y reactivar beneficiarios inactivos',
      icon: <UserX size={40} />,
      path: '/dashboard/beneficiarios/inactivos',
      color: '#D32F2F',
    },
    {
      title: 'Reportes',
      description: 'Generar reportes del sistema',
      icon: <FileText size={40} />,
      path: '/dashboard/reportes/carga-familiar',
      color: '#FF4040',
    },
  ];

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Bienvenid@, {user?.nom_user}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistema de Gestión de Beneficios para la Comunidad
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                borderTop: `4px solid ${card.color}`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
            >
              <CardActionArea 
                sx={{ height: '100%' }}
                onClick={() => navigate(card.path)}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: card.color, mb: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          Acerca del Sistema
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          El Sistema de Gestión de Beneficios es una herramienta diseñada para facilitar la administración de beneficiarios y sus dependientes en la comunidad.
        </Typography>
        <Typography variant="body1" paragraph>
          Con este sistema, los administradores pueden:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Registrar y gestionar beneficiarios de la comunidad
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Administrar dependientes de cada beneficiario
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Generar reportes de carga familiar, habitantes por calle y por rango de edad
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Exportar información en formatos Excel y PDF
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardPage;