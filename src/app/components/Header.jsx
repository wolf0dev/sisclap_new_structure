import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Chip,
} from '@mui/material';
import { Menu as MenuIcon, ChevronLeft, Sun, Moon, LogOut, User } from 'lucide-react';

const Header = ({
  open,
  onToggleSidebar,
  title,
  user,
  onProfileClick,
  onLogout,
  isDarkMode,
  onToggleTheme,
  getRoleLabel,
  getRoleColor,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    onProfileClick();
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={onToggleSidebar}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={getRoleLabel()} 
              color={getRoleColor()}
              size="small"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />

            <Tooltip title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}>
              <IconButton color="inherit" onClick={onToggleTheme} sx={{ mr: 1 }}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Configuración de cuenta">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt={user?.nom_user || 'Usuario'}
                  src={user?.foto_perfil || ''}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfile}>
          <User size={20} style={{ marginRight: 8 }} />
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogOut size={20} style={{ marginRight: 8 }} />
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;