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
        postComment: builder.mutation({
            query: ({ bookId, commentData }) => ({
              url: `/comment/${bookId}`,
              method: 'POST',
              body: commentData,
            }),
            invalidatesTags: [{type: 'Comments'}]
          }),
        getBooks: builder.query({
            query: () => '/books',
            providesTags: () => [{type: 'Books'}]
        }),
        getBookById: builder.query({
            query: (id) => `/book/${id}`,
            providesTags: (id) => [{ type: 'Books', id }, {type: 'Comments', id}],
        }),
        updateBook: builder.mutation({
            query: ({ bookId, updatedBookData }) => ({
                url: `/editBook/${bookId}`,
                method: 'PUT',
                body: updatedBookData,
            }),
            invalidatesTags: [{ type: 'Books' }],
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

export const {useAddBookMutation, useGetBooksQuery, useGetBookByIdQuery, useDeleteBookMutation, usePostCommentMutation, useUpdateBookMutation} = bookAPI;