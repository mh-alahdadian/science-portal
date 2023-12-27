import { isServer } from '@tanstack/react-query';
import { listenApiEvent } from './api';

if (!isServer) {
  const toast = require('react-toastify').toast;
  listenApiEvent('error', (error, request) => {
    const formatError = request.payload.formatError ?? String;
    if (formatError !== false) {
      toast.error(formatError(error));
    }
  });
}

export {};
