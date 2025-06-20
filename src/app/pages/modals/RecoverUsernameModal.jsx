import React, { useState } from 'react';
import {
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { useAuth } from '../../../security';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from '../../components';

const RecoverUsernameModal = ({ open, handleClose }) => {
  const { recoverUsername } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recoveredUsername, setRecoveredUsername] = useState('');

  const formik = useFormik({
    initialValues: {
      ced_user: '',
      nom_user: '',
    },
    validationSchema: Yup.object({
      ced_user: Yup.string()
        .required('La cédula es requerida')
        .matches(/^[0-9]+$/, 'La cédula debe contener solo números'),
      nom_user: Yup.string().required('El nombre es requerido'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await recoverUsername(values.ced_user, values.nom_user);
        setRecoveredUsername(response.Usuario);
        setSuccess(true);
      } catch (error) {
        console.error('Error al recuperar usuario:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      title="Recuperar Nombre de Usuario"
      maxWidth="sm"
    >
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Su nombre de usuario es: {recoveredUsername}
        </Alert>
      )}

      <Typography variant="body2" color="text.secondary" paragraph>
        Ingresa tu cédula y nombre completo para recuperar tu nombre de usuario.
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="ced_user"
          label="Cédula"
          name="ced_user"
          autoComplete="off"
          autoFocus
          value={formik.values.ced_user}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.ced_user && Boolean(formik.errors.ced_user)}
          helperText={formik.touched.ced_user && formik.errors.ced_user}
          disabled={loading || success}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="nom_user"
          label="Nombre Completo"
          name="nom_user"
          autoComplete="off"
          value={formik.values.nom_user}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nom_user && Boolean(formik.errors.nom_user)}
          helperText={formik.touched.nom_user && formik.errors.nom_user}
          disabled={loading || success}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading || success}
            loading={loading}
            fullWidth
          >
            Recuperar Usuario
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={handleClose}
            fullWidth
          >
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecoverUsernameModal;