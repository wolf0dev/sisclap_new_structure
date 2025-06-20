import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search,
  UserPlus,
  Edit,
  Eye,
  MoreVertical,
  UserX,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../security';
import { beneficiarioService } from '../../domain/services';
import { useNotification } from '../providers/NotificationProvider';
import { Button, Table, PageHeader, EmptyState, LoadingOverlay, ConfirmDialog } from '../components';

const BeneficiariosPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user, isLiderComunidad, isJefeCalle, getUserCalle } = useAuth();
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  const fetchBeneficiarios = async () => {
    setLoading(true);
    try {
      let data;
      
      if (isLiderComunidad()) {
        data = await beneficiarioService.getAll();
      } else if (isJefeCalle()) {
        const userCalle = getUserCalle();
        if (userCalle) {
          data = await beneficiarioService.getAllByUserCalle(userCalle);
        } else {
          data = [];
          showNotification('No se pudo determinar tu calle asignada', 'error');
        }
      } else {
        data = [];
        showNotification('No tienes permisos para ver beneficiarios', 'error');
      }

      const activeBeneficiarios = data.filter(b => beneficiarioService.isActive(b));
      setBeneficiarios(activeBeneficiarios);
    } catch (error) {
      console.error('Error al obtener beneficiarios:', error);
      const errorMessage = error.response?.data?.error || 'Error al cargar los beneficiarios';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenMenu = (event, beneficiario) => {
    if (!canAccessBeneficiario(beneficiario)) {
      showNotification('No tienes permisos para acceder a este beneficiario', 'error');
      return;
    }

    setMenuAnchorEl(event.currentTarget);
    setSelectedBeneficiario(beneficiario);
    setSelectedRowId(beneficiario.cedula);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setSelectedRowId(null);
  };

  const canAccessBeneficiario = (beneficiario) => {
    if (!user) return false;
    return beneficiarioService.canAccessBeneficiario(
      beneficiario, 
      user.id_rol_user, 
      user.id_calle
    );
  };

  const handleView = () => {
    handleCloseMenu();
    if (selectedBeneficiario && canAccessBeneficiario(selectedBeneficiario)) {
      navigate(`/dashboard/beneficiarios/view/${selectedBeneficiario.cedula}`);
    }
  };

  const handleEdit = () => {
    handleCloseMenu();
    if (selectedBeneficiario && canAccessBeneficiario(selectedBeneficiario)) {
      navigate(`/dashboard/beneficiarios/edit/${selectedBeneficiario.cedula}`);
    }
  };

  const handleDisable = () => {
    handleCloseMenu();
    if (selectedBeneficiario && canAccessBeneficiario(selectedBeneficiario)) {
      setConfirmDialogOpen(true);
    }
  };

  const confirmDisable = async () => {
    if (selectedBeneficiario) {
      try {
        await beneficiarioService.updateStatus(selectedBeneficiario.cedula, 'Inactivo');
        showNotification('Beneficiario deshabilitado exitosamente', 'success');
        fetchBeneficiarios();
      } catch (error) {
        console.error('Error al deshabilitar beneficiario:', error);
        const errorMessage = error.response?.data?.error || 'Error al deshabilitar el beneficiario';
        showNotification(errorMessage, 'error');
      } finally {
        setConfirmDialogOpen(false);
        setSelectedBeneficiario(null);
      }
    }
  };

  const filteredBeneficiarios = beneficiarios.filter((beneficiario) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      beneficiario.cedula.toLowerCase().includes(searchTermLower) ||
      beneficiario.nombre_apellido.toLowerCase().includes(searchTermLower) ||
      beneficiario.telefono.toLowerCase().includes(searchTermLower) ||
      beneficiario.profesion.toLowerCase().includes(searchTermLower)
    );
  });

  const columns = [
    {
      field: 'cedula',
      headerName: 'Cédula',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'nombre_apellido',
      headerName: 'Nombre y Apellido',
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: 'profesion',
      headerName: 'Profesión',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      minWidth: 130,
    },
    ...(isLiderComunidad() ? [{
      field: 'nom_calle',
      headerName: 'Calle',
      flex: 1,
      minWidth: 150,
    }] : []),
    {
      field: 'fecha_nacimiento',
      headerName: 'Fecha Nacimiento',
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: 'estatus',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={beneficiarioService.isActive({ estatus: params.value }) ? 'Activo' : 'Inactivo'}
          color={beneficiarioService.isActive({ estatus: params.value }) ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Opciones">
            <IconButton
              onClick={(e) => handleOpenMenu(e, params.row)}
              color={selectedRowId === params.row.cedula ? 'primary' : 'default'}
              disabled={!canAccessBeneficiario(params.row)}
            >
              <MoreVertical size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const getPageTitle = () => {
    if (isLiderComunidad()) {
      return 'Beneficiarios - Todas las Calles';
    } else if (isJefeCalle()) {
      return `Beneficiarios - Mi Calle`;
    }
    return 'Beneficiarios';
  };

  return (
    <Box>
      <PageHeader
        title={getPageTitle()}
        breadcrumbs={[
          { label: 'Inicio', path: '/dashboard' },
          { label: 'Beneficiarios' },
        ]}
        action={{
          label: 'Nuevo Beneficiario',
          onClick: () => navigate('/dashboard/beneficiarios/new'),
          icon: <UserPlus size={20} />,
        }}
      />
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField
            placeholder="Buscar beneficiario..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={20} />}
            onClick={fetchBeneficiarios}
          >
            Actualizar
          </Button>
        </Box>

        {loading ? (
          <LoadingOverlay open={loading} message="Cargando beneficiarios..." />
        ) : beneficiarios.length === 0 ? (
          <EmptyState
            title="No hay beneficiarios registrados"
            description={
              isJefeCalle() 
                ? "No hay beneficiarios registrados en tu calle asignada."
                : "Comienza registrando un nuevo beneficiario en el sistema."
            }
            actionText="Registrar Beneficiario"
            onAction={() => navigate('/dashboard/beneficiarios/new')}
            icon={<UserPlus size={80} />}
          />
        ) : (
          <Table
            rows={filteredBeneficiarios}
            columns={columns}
            getRowId={(row) => row.cedula}
          />
        )}
      </Paper>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <Eye size={20} />
          </ListItemIcon>
          <ListItemText>Ver Detalles</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Edit size={20} />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDisable}>
          <ListItemIcon>
            <UserX size={20} />
          </ListItemIcon>
          <ListItemText>Deshabilitar</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="Deshabilitar Beneficiario"
        message={`¿Estás seguro de que deseas deshabilitar al beneficiario ${selectedBeneficiario?.nombre_apellido}?`}
        confirmText="Deshabilitar"
        cancelText="Cancelar"
        onConfirm={confirmDisable}
        onCancel={() => setConfirmDialogOpen(false)}
        severity="warning"
      />
    </Box>
  );
};

export default BeneficiariosPage;