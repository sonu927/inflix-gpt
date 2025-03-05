import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name: 'ai',
    initialState: {
        showSearchPage: false,
        aiSuggestionMovies: null
    },
    reducers: {
        toggleShowSearch: (state)=>{
            state.showSearchPage = !state.showSearchPage
        },
        addAiSuggestionMovies: (state,action) => {
            state.aiSuggestionMovies = action.payload;
        }
    }
});

export const {toggleShowSearch,addAiSuggestionMovies} = aiSlice.actions;

export default aiSlice.reducer;