import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold } from '@google/generative-ai';
import React, { useEffect, useRef, useState } from 'react'
import { API_OPTIONS, GEMINI_KEY } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { addAiSuggestionMovies } from '../../utils/aiSlice';

const AiSearchBar = ({setLoading}) => {
    const searchText = useRef(null);
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const dispatch = useDispatch();

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 0.7, // Less randomness for more accurate suggestions
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 500, // Limit response length
        responseMimeType: "text/plain",
    };

    const handleOnChange = (e) => {
        let value = e.target.value;
        searchText.current.value = value;
    } 

    
    const fetchMoviesData = async (movies) => {
        try {
            const moviesRequests = movies.map((movie) => {
                return fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,API_OPTIONS)
                .then(response => response.json())
            });
            const movieResults = await Promise.all(moviesRequests);
            const moviesData = movieResults.map((result, index) => {
                if (result.results.length > 0) {
                    return result.results[0] // Taking the first search result as the most relevant
                } else {
                    return {}; // No movie found
                }
            });
            dispatch(addAiSuggestionMovies(moviesData))
            console.log(moviesData)
        } catch (error) {
            console.error("Error in fetching movies",error)
        }
    }
    const handleAiSearch = async () => {
        console.log("dkskdls", searchText.current.value);    
        const userInput = searchText.current.value.trim();
        if (!userInput) return;
        setLoading(true);
        try {
            const prompt = `Act as a movie recommendation system and suggest some movies for the query: "${userInput}".
            Only return the names of **exactly** 5 movies, separated by commas.
            Example: Gadar,Koi mil gaya,Jism,Raaz,Beta.
            If you cannot provide movie names, **return ONLY the word "error"** (without any explanation or additional text).`;
    
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig
            });
    
            const responseText = (await result.response.text()).trim();
            console.log("djksjdksjskjs", responseText);
    
            // Handle AI errors
            if (responseText.toLowerCase() === "error") {
                alert("Sorry, I couldn't find movie recommendations. Please try a different query.");
                return;
            }
    
            // Process movie list
            const movies = responseText.split(",").map(movie => movie.trim());
            if (movies.length === 5) {
                fetchMoviesData(movies);
            } else {
                console.error("Unexpected AI response:", responseText);
                alert("Sorry, I couldn't find movie recommendations. Please try again.");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error in Gemini API:", error);
            alert("An error occurred while fetching movie recommendations. Please try again later.");
        }
    };
    
    return (
        <div className='py-12 flex justify-center items-center'>
            <div className='py-6 px-4 bg-custom-dark w-[50%] rounded-lg flex flex-col gap-1 text-white'>
                <textarea
                ref={searchText}
                placeholder="What are you looking for?"
                className="row-span-10 bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-y-auto h-[40px] max-h-64 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 p-2"
                onChange={handleOnChange}
                />
                <div className='flex justify-end gap-6'>
                    <button className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200' onClick={handleAiSearch}>
                        <span className='ri-search-2-line text-2xl text-black leading-none'></span>
                    </button>
                </div>
            </div>
        </div>
    )
}
{/**/}

export default AiSearchBar