import { configureStore } from '@reduxjs/toolkit';
import { apiWA } from '../serice/apiWA';

export const store = configureStore({
    reducer: {
        [apiWA.reducerPath]: apiWA.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiWA.middleware),
});
