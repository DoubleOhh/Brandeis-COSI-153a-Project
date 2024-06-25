import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { lighttheme, darktheme } from './theme';

// Create a Context
export const GlobalContext = createContext();

const baseurl = 'https://api.mangadex.org';

// Actions
const LOADING = "LOADING";
const SET_POPULAR_MANGAS = "SET_POPULAR_MANGAS";
const SET_TOP_MANGAS = "SET_TOP_MANGAS";
const SET_LATEST_MANGAS = "SET_LATEST_MANGAS";
const SET_IS_SEARCHING = "SET_IS_SEARCHING";
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
    case SET_IS_SEARCHING:
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

  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to fetch popular mangas
  const getPopularMangas = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseurl}/manga?limit=20&order[followedCount]=desc`);
      const data = await response.json();
      const mangas = data.data;
      const mangasWithCovers = await Promise.all(mangas.map(async (manga) => {
        const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
        const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
        const coverData = await coverResponse.json();
        return { ...manga, coverFilename: coverData.data.attributes.fileName };
      }));
      dispatch({ type: SET_POPULAR_MANGAS, payload: mangasWithCovers });
    } catch (error) {
      console.error('Error fetching popular mangas:', error);
      dispatch({ type: LOADING, payload: false });
    }
  };

  // Function to fetch top mangas
  const getTopMangas = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseurl}/manga?limit=20&order[relevance]=desc`);
      const data = await response.json();
      const mangas = data.data;
      const mangasWithCovers = await Promise.all(mangas.map(async (manga) => {
        const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
        const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
        const coverData = await coverResponse.json();
        return { ...manga, coverFilename: coverData.data.attributes.fileName };
      }));
      dispatch({ type: SET_TOP_MANGAS, payload: mangasWithCovers });
    } catch (error) {
      console.error('Error fetching top mangas:', error);
      dispatch({ type: LOADING, payload: false });
    }
  };

  // Function to fetch latest mangas
  const getLatestMangas = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseurl}/manga?limit=20&order[updatedAt]=desc`);
      const data = await response.json();
      const mangas = data.data;
      const mangasWithCovers = await Promise.all(mangas.map(async (manga) => {
        const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
        const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
        const coverData = await coverResponse.json();
        return { ...manga, coverFilename: coverData.data.attributes.fileName };
      }));
      dispatch({ type: SET_LATEST_MANGAS, payload: mangasWithCovers });
    } catch (error) {
      console.error('Error fetching latest mangas:', error);
      dispatch({ type: LOADING, payload: false });
    }
  };

  // Function to fetch search results
  const searchManga = async (query) => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseurl}/manga?title=${query}`);
      const data = await response.json();
      const mangas = data.data;
      const mangasWithCovers = await Promise.all(mangas.map(async (manga) => {
        const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
        const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
        const coverData = await coverResponse.json();
        return { ...manga, coverFilename: coverData.data.attributes.fileName };
      }));
      dispatch({ type: SET_IS_SEARCHING, payload: mangasWithCovers });
    } catch (error) {
      console.error('Error fetching search results:', error);
      dispatch({ type: LOADING, payload: false });
    }
  };

  // Function to fetch chapters
  const getChapters = async (id) => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseurl}/manga/${id}/feed`);
      const data = await response.json();
      dispatch({ type: SET_CHAPTERS, payload: data.data });
    } catch (error) {
      console.error('Error fetching chapters:', error);
      dispatch({ type: LOADING, payload: false });
    }
  };

  const getMangaDetails = async (id) => {
    try {
      const response = await fetch(`${baseurl}/manga/${id}`);
      const data = await response.json();
      const manga = data.data;
      const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
      const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
      const coverData = await coverResponse.json();
      return { ...manga, coverFilename: coverData.data.attributes.fileName };
    } catch (error) {
      console.error('Error fetching manga details:', error);
      throw error;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getPopularMangas,
        getTopMangas,
        getLatestMangas,
        searchManga,
        getChapters,
        getMangaDetails,
        currentTheme: state.theme === 'light' ? lighttheme : darktheme,
        toggleTheme: () => dispatch({ type: TOGGLE_THEME }),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the Global Context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
