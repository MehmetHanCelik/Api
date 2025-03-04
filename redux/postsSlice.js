import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page, { getState }) => {
    const limit = 10;
    const response = await fetch(`${API_URL}?_limit=${limit}&_page=${page}`);
    const data = await response.json();


    const previousData = getState().posts.data;
    return page === 1 ? data : [...previousData, ...data];
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: { data: [], page: 1, loading: false, error: null },
    reducers: {
        refreshPosts: (state) => {
            state.page = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.page += 1;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
                state.error = 'Veriler alinamadi!';
            });
    },
});

export const { refreshPosts } = postsSlice.actions;
export default postsSlice.reducer;
