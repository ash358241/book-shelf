import { api } from "../../api/apiSlice";

const bookAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        addBook: builder.mutation({
            query: (bookData) => ({
                url: '/addBook',
                method: 'POST',
                body: bookData,
            })
        }),
        getBooks: builder.query({
            query: () => '/books'
        })
    })
})

export const {useAddBookMutation, useGetBooksQuery} = bookAPI;