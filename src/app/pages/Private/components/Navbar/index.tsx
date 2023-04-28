import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppBar, Box, Container, IconButton, Menu, Divider,
  MenuItem, Toolbar, Typography, Avatar, Switch, useTheme,
} from '@mui/material';
import {
  Adb as AdbIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { typeReducers } from '@redux/modules/rootReducer';
import { setTheme } from '@redux/modules/theme';
import { userActions } from '@redux/modules/user';
import { taskActions } from '@redux/modules/tasks';

type HeaderProps = {
  settings: string[];
}

export const Navbar = ({ settings }: HeaderProps) => {
  const redirect = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const themeName = useAppSelector((state: typeReducers) => state.theme) as 'light' | 'dark';

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChangeTheme = () => {
    dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(userActions.logout());
    dispatch(taskActions.clearTasks());
    redirect('/');
  };

  const { name } = useAppSelector((state: typeReducers) => state.user);
  return (
    <AppBar
      position="relative"
      className="shadow-none"
    >
      <Container
        maxWidth={false}
      >
        <Toolbar
          disableGutters
          className="flex flex-grow flex-1 items-center justify-between "
        >
          <Box className="flex items-center">
            <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
            <Link to="/" className="hidden sm:block mr-2 text-white text-xl flex-nowrap font-bold  tracking-[0.2rem]">
              Welcome, {name}
            </Link>

          </Box>

          {/* <= MD */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1, position: 'absolute' }}>
            <Link to="/">
              <AdbIcon />
            </Link>
          </Box>
          <Box>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <Avatar alt={name} src={`https://robohash.org/${name}`} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}

            >
              <MenuItem className="flex" color="text.secondary">
                <Typography textAlign="center" className="mr-4" color="text.secondary">
                  Theme
                </Typography>

                <LightModeIcon sx={{ color: 'text.secondary' }} className="text-sm" />
                <Switch size="small" onClick={handleChangeTheme} checked={themeName === 'dark'} />
                <DarkModeIcon sx={{ color: 'text.secondary' }} className="text-sm" />
              </MenuItem>

              <MenuItem key="profile" onClick={handleCloseUserMenu} color="text.secondary">
                <Link to="/auth/profile" style={{ color: theme.palette.text.secondary }}>My Profile</Link>
              </MenuItem>

              {settings?.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={setting} style={{ color: theme.palette.text.secondary }}>
                    {setting}
                  </Link>
                </MenuItem>
              ))}

              <Divider />
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center" color="text.secondary">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
