'use client';

import { CacheProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { queryClient } from 'src/core/api';
import { StyleRegistry } from 'styled-jsx';
import { useEmotionCache, useStyledJsxRegistry } from './styling';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const cache = useEmotionCache();
  const jsxStyleRegistry = useStyledJsxRegistry();

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
        <ToastContainer theme="colored" rtl position="bottom-right" />
      </CacheProvider>
    </QueryClientProvider>
  );
}
