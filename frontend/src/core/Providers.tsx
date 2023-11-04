'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { queryClient } from 'src/core/api';
import { useEmotionCache, theme } from './styling';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const cache = useEmotionCache();
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {children}
          <ToastContainer theme="colored" rtl position="bottom-right" />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
