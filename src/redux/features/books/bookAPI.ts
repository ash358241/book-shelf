import { api } from "../../api/apiSlice";

const bookAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        addBook: builder.mutation({
            query: (bookData) => ({
                url: '/addBook',
                method: 'POST',
                body: bookData,
            }),
            invalidatesTags: [{type: 'Books'}]
        }),
        getBooks: builder.query({
            query: () => '/books',
            providesTags: () => [{type: 'Books'}]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
              url: `/deleteBook/${id}`, 
              method: 'DELETE',
            }),
            invalidatesTags: () => [{type: 'Books'}]
          }),
          
    })
})

export const {useAddBookMutation, useGetBooksQuery, useDeleteBookMutation} = bookAPI;