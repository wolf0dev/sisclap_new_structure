import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Box,
} from '@mui/material';
import { useAuth } from '../../../security';
import { calleService } from '../../../domain/services';
import { Modal, Button } from '../../components';

const RegisterModal = ({ open, onClose }) => {
  const { register } = useAuth();
  const [calles, setCalles] = useState([]);
  const [loadingCalles, setLoadingCalles] = useState(false);
  const [formData, setFormData] = useState({
    nom_user: '',
    ced_user: '',
    user: '',
    pass_user: '',
    correo: '',
    id_calle: 0,
  });

  useEffect(() => {
    if (open) {
      fetchCalles();
    }
  }, [open]);

  const fetchCalles = async () => {
    setLoadingCalles(true);
    try {
      const data = await calleService.getAll();
      setCalles(data);
    } catch (error) {
      console.error('Error al obtener calles:', error);
    } finally {
      setLoadingCalles(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'id_calle' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...formData, id_rol_user: 2 });
      onClose();
      setFormData({
        nom_user: '',
        ced_user: '',
        user: '',
        pass_user: '',
        correo: '',
        id_calle: 0,
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Registro de Usuario"
      maxWidth="sm"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nombre Completo"
          name="nom_user"
          value={formData.nom_user}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Cédula"
          name="ced_user"
          value={formData.ced_user}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Usuario"
          name="user"
          value={formData.user}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          name="pass_user"
          value={formData.pass_user}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Correo"
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="calle-label">Calle</InputLabel>
          <Select
            labelId="calle-label"
            id="id_calle"
            name="id_calle"
            value={formData.id_calle}
            label="Calle"
            onChange={handleChange}
            disabled={loadingCalles}
          >
            <MenuItem value={0} disabled>
              Seleccione una calle
            </MenuItem>
            {calles.map((calle) => (
              <MenuItem key={calle.id_calle} value={calle.id_calle}>
                {calle.nom_calle}
              </MenuItem>
            ))}
          </Select>
          {loadingCalles && (
            <FormHelperText>
              <CircularProgress size={16} /> Cargando calles...
            </FormHelperText>
          )}
        </FormControl>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained"
            disabled={formData.id_calle === 0 || loadingCalles}
            fullWidth
          >
            Registrar
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={onClose}
            fullWidth
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterModal;