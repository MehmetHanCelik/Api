import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// API'den gelen verileri Türkçeye çevirme fonksiyonu
const translateToTurkish = (data) => {
    return data.map((item, index) => ({
        id: item.id,
        title: [
            'Hoş Geldiniz!',
            'Steam Nedir?',
            'İndirimler',
            'En Popüler Oyunlar',
            'Haberler'
        ][index % 5], // Döngüyle farklı başlıklar kullan
        body: [
            'Bu uygulama React Native ile geliştirilmiştir.',
            'Steam, dijital oyun platformudur.',
            'Steam üzerinde sık sık büyük indirimler olur.',
            'CS:GO, Dota 2, PUBG gibi oyunlar Steam’de popülerdir.',
            'Steam yeni özellikler getirmeye devam ediyor!'
        ][index % 5] // Döngüyle farklı açıklamalar kullan
    }));
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return translateToTurkish(data); // Gelen verileri Türkçeye çevir
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
                state.error = 'Veriler alınamadı!';
            });
    },
});

export default postsSlice.reducer;
