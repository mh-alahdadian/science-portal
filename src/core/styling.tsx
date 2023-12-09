'use client';

import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';

export const theme = createTheme({
  direction: 'rtl',
  components: {
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },
  },
});

export function useEmotionCache() {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: 'muirtl',
      prepend: true,
      stylisPlugins: [rtlPlugin],
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return cache;
}
