import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiWA } from '../services/apiWA';
import { messagesSlice } from './messagesSlice';

const rootReducer = combineReducers({
    [apiWA.reducerPath]: apiWA.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiWA.middleware),
});
