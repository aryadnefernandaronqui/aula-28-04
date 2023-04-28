import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { useSelector } from 'react-redux';
import { typeReducers } from '@redux/modules/rootReducer';
import { getTheme } from '@styles/themes';

import { Private, HomePrivate, Profile } from '@pages/Private';
import { Home, Login, Public } from '@pages/Public';

export function App() {
  const nameTheme = useSelector((state: typeReducers) => state.theme) as 'light' | 'dark';
  const [theme, setThemeState] = useState(getTheme(nameTheme));

  useEffect(() => {
    setThemeState(getTheme(nameTheme));
  }, [nameTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`${nameTheme} h-full`}>
        <Routes>
          <Route path="/auth" element={<Private />}>
            <Route index element={<HomePrivate />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<Public />}>
            <Route index element={<Home />} />
            <Route path="account" element={<Login />} />
          </Route>

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
