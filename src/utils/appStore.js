import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import moviesSlice from './moviesSlice';
import aiSlice from './aiSlice';

const appStore = configureStore({
    reducer: {
        user: userSlice,
        movies: moviesSlice,
        ai: aiSlice,
    }
})

export default appStore;