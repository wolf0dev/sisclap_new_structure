import React from 'react';
import { TextField, Typography, Alert, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../security';
import { Modal, Button } from '../../components';

const RecoverPasswordModal = ({ open, handleClose }) => {
  const { recoverPassword } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      correo: '',
      cedula: '',
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
      cedula: Yup.string()
        .required('La cédula es requerida')
        .matches(/^[0-9]+$/, 'La cédula debe contener solo números'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await recoverPassword(values.correo, values.cedula);
        setSuccess(true);
      } catch (error) {
        console.error('Error al recuperar contraseña:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      title="Recuperar Contraseña"
      maxWidth="sm"
    >
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Su nueva contraseña es su Cédula seguida de su usuario.
          Ejemplo: 12345678usuario.
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="correo"
          label="Correo Electrónico"
          name="correo"
          autoComplete="off"
          autoFocus
          value={formik.values.correo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.correo && Boolean(formik.errors.correo)}
          helperText={formik.touched.correo && formik.errors.correo}
          disabled={loading || success}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="cedula"
          label="Cédula"
          name="cedula"
          autoComplete="off"
          value={formik.values.cedula}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cedula && Boolean(formik.errors.cedula)}
          helperText={formik.touched.cedula && formik.errors.cedula}
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
            Recuperar Contraseña
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

export default RecoverPasswordModal;