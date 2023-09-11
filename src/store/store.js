import { configureStore } from '@reduxjs/toolkit';
import { apiWA } from '../services/apiWA';
import { addMessage } from './messagesSlice';

export const store = configureStore({
    reducer: {
        [apiWA.reducerPath]: apiWA.reducer,
        addMessage,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiWA.middleware),
});
