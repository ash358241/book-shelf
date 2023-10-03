import { api } from "../../api/apiSlice";

const bookAPI = api.injectEndpoints({
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

export const {useAddBookMutation} = bookAPI;