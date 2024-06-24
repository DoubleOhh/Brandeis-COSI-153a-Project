import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { lightTheme, darkTheme } from './themes'; // Ensure themes are imported if used


// Create a Context
export const GlobalContext = createContext();

const baseurl = 'https://api.mangadex.org';

// Actions
const LOADING = "LOADING";
const SET_POPULAR_MANGAS = "SET_POPULAR_MANGAS";
const SET_TOP_MANGAS = "SET_TOP_MANGAS";
const SET_LATEST_MANGAS = "SET_LATEST_MANGAS";
const SEARCHING = "SEARCHING";
const SET_CHAPTERS = "SET_CHAPTERS";
const TOGGLE_THEME = "TOGGLE_THEME";

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case SET_POPULAR_MANGAS:
            return { ...state, popularMangas: action.payload, loading: false };
        case SET_TOP_MANGAS:
            return { ...state, topMangas: action.payload, loading: false };
        case SET_LATEST_MANGAS:
            return { ...state, latestMangas: action.payload, loading: false };
        case SEARCHING:
            return { ...state, searchResults: action.payload, loading: false };
        case SET_CHAPTERS:
            return { ...state, chapters: action.payload, loading: false };
        case LOADING:
            return { ...state, loading: true };
        case TOGGLE_THEME:
            return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
        default:
            return state;
    }
};


// Create a Provider component
export const GlobalProvider = ({ children }) => {
    
    // Initial state
    const initialState = {
        popularMangas: [],
        topMangas: [],
        latestMangas: [],
        loading: false,
        isSearching: false,
        searchResults: [],
        chapters: [],
        theme: 'light', // Default theme
    };

    // Reducer function
    const [state, dispatch] = useReducer(reducer, initialState);
    // Search
    const [search, setSearch] = React.useState('');
    // Theme
    const currentTheme = state.theme === 'light' ? lighttheme : darktheme;

    //handle change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearching = false;
        }
    }

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        }else{
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }

    // Function to fetch popular mangas
    const getPopularMangas = async () => {
        dispatch({ type: LOADING });
        try {
            const response = await axios.get(`${baseurl}/manga`, {
                params: {
                    limit: 10,
                    'order[followedCount]': 'desc'
                }
         });
            dispatch({ type: SET_POPULAR_MANGAS, payload: response.data.data });
    } catch (error) {
        console.error('Error fetching popular mangas:', error);
        dispatch({ type: LOADING, payload: false });
    }
    }

    // Function to fetch top mangas
    const getTopMangas = async () => {
        dispatch({ type: LOADING });
        try {
            const response = await fetch(`${baseUrl}/manga`);
            const data = await response.json();
            dispatch({ type: SET_TOP_MANGAS, payload: data.data });
    } catch (error) {
        console.error('Error fetching top mangas:', error);
        dispatch({ type: LOADING, payload: false });
    }
    }

    // Function to fetch latest mangas
    const getLatestMangas = async () => {
        dispatch({ type: LOADING });
        try {
            const response = await fetch(`${baseUrl}/manga`);
            const data = await response.json();
            dispatch({ type: SET_LATEST_MANGAS, payload: data.data });
    } catch (error) {
        console.error('Error fetching latest mangas:', error);
        dispatch({ type: LOADING, payload: false });
    }
    }

    // Function to fetch search results
    const searchManga = async (query) => {
        dispatch({ type: LOADING });
        try {
            const response = await fetch(`${baseUrl}/manga?title=${query}`);
            const data = await response.json();
            dispatch({ type: SET_IS_SEARCHING, payload: data.data });
    } catch (error) {
        console.error('Error fetching search results:', error);
        dispatch({ type: LOADING, payload: false });
    }
    }

    // Function to fetch chapters
    const getChapters = async (id) => {
        dispatch({ type: LOADING });
        try {
            const response = await fetch(`${baseUrl}/manga/${id}/feed`);
            const data = await response.json();
            dispatch({ type: SET_CHAPTERS, payload: data.data });
    } catch (error) {
        console.error('Error fetching chapters:', error);
        dispatch({ type: LOADING, payload: false });
    }
    }

    // Function to toggle theme
    const toggleTheme = () => {
        dispatch({ type: TOGGLE_THEME });
    };

    //initial render
    React.useEffect(() => {
        getPopularMangas();
    }, [])


    return (
        <GlobalContext.Provider value={{ 
            ...state, 
            handleChange, 
            handleSubmit, 
            getPopularMangas, 
            getTopMangas, 
            getLatestMangas,
            searchManga,
            search,
            getChapters,
            currentTheme,  
            toggleTheme}}>
                {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the Global Context
export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};