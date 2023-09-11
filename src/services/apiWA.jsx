import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiWA = createApi({
    reducerPath: 'apiWA',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.green-api.com',
    }),
    endpoints: (builder) => ({
        accountStatus: builder.mutation({
            query: ({ idInstance, apiTokenInstance }) => ({
                url: `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
                method: 'GET',
            }),
        }),
        message: builder.mutation({
            query: ({ idInstance, apiTokenInstance, body }) => ({
                url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
                method: 'POST',
                body,
            }),
        }),
        setMessage: builder.mutation({
            query: ({ idInstance, apiTokenInstance }) => ({
                url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useMessageMutation,
    useAccountStatusMutation,
    useSetMessageMutation,
} = apiWA;