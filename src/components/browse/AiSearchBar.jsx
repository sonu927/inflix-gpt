import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold } from '@google/generative-ai';
import React, { useRef, useState } from 'react'
import { API_OPTIONS, GEMINI_KEY } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { addAiSuggestionMovies } from '../../utils/aiSlice';

const AiSearchBar = () => {
    const searchText = useRef(null);
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const dispatch = useDispatch();
    const speechSupported = ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    const [isListening,setIsListening] = useState(false);
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

    const startSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        }

        recognition.onspeechend = () => {
            recognition.stop();
            setIsListening(false)
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchText.current.value = transcript;
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Error with speech recognition: " + event.error);
            setIsListening(false);
        }

        recognition.start();
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
        console.log("dkskdls",searchText.current.value);    
        const userInput = searchText.current.value.trim();
        if(!userInput) return;

        try {
            const prompt = "Act as a movie recommendation system and suggest some movies for the query :"
                + userInput +
                ". Only give me the names of 5 movies, like the example result given ahead. Example Result: Gadar,Koi mil gaya,jism,raaz,beta";
            const result = await model.generateContent({
                contents: [{role:'user',parts:[{text: prompt}]}],
                generationConfig
            })
            const responseText = await result.response.text();
            console.log("djksjdksjskjs",responseText);
            if(responseText.length > 0){
                fetchMoviesData(responseText.split(','));
            }
        } catch (error) {
            console.error("Error in gemini api",error)
        }

    }
    return (
        <div className='py-12 flex justify-center items-center'>
            <div className='py-6 px-4 bg-[#171717]/95 w-[50%] rounded-lg flex flex-col gap-1 text-white'>
                <textarea
                ref={searchText}
                placeholder="What are you looking for?"
                className="row-span-10 bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-y-auto h-[40px] max-h-64 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 p-2"
                onChange={handleOnChange}
                />
                <div className='flex justify-end gap-6'>
                    {speechSupported && 
                        <button className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200' onClick={startSpeechRecognition}>
                            <span className={`ri-mic-ai-line text-2xl ${isListening ? "text-red-500" : "text-black"} leading-none`}></span>
                        </button>
                    }
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