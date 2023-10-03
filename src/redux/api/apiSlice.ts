import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    endpoints: (builder) => ({
        addBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData,
            })
        })
    })
})

export const {useAddBookMutation} = api;