import { create } from 'zustand'
import { lighttheme, darktheme } from '../context/theme';
import {devtools, persist, createJSONStorage } from 'zustand/middleware'
import storage from './mmkv'; // Import the configured MMKV instance

const baseurl = 'https://api.mangadex.org';

export const useHistoryStore = create(
    persist(
    (set, get) => ({
     mangas: [],
     items: 0,
     addHistory: (manga) => set((state) => {
       state.items++;
       state.mangas = [...state.mangas, manga];
       return { items: state.items, mangas: state.mangas };
     }),
     removeHistory: (manga) => set((state) => ({
       items: state.items - 1,
       mangas: state.mangas.filter(m => m.id !== manga.id),
    })),
     numberOfHistory: () => set((state) => ({ items: state.mangas.length })),
     }),
    {
      name: 'history-store',
      storage: createJSONStorage(()  =>  zustandMMKVStorage),
    },
  )
);

export const useMangaStore = create((set) => ({
  searchResults: [],
  popularMangas: [],
  topMangas: [],
  latestMangas: [],
  loading: false,
  isSearching: false,
  
  getPopularMangas: async () => {
    set({ loading: true });
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
      set({ popularMangas: mangasWithCovers, loading: false });
    } catch (error) {
      console.error('Error fetching popular mangas:', error);
      set({ loading: false });
    }
  },

  getTopMangas: async () => {
    set({ loading: true });
    try {
      const response = await fetch(`${baseurl}/manga?limit=20&order[latestUploadedChapter]=desc`);
      const data = await response.json();
      const mangas = data.data;
      const mangasWithCovers = await Promise.all(mangas.map(async (manga) => {
        const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
        const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
        const coverData = await coverResponse.json();
        return { ...manga, coverFilename: coverData.data.attributes.fileName };
      }));
      set({ topMangas: mangasWithCovers, loading: false });
    } catch (error) {
      console.error('Error fetching top mangas:', error);
      set({ loading: false });
    }
  },

  getLatestMangas: async () => {
    set({ loading: true });
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
      set({ latestMangas: mangasWithCovers, loading: false });
    } catch (error) {
      console.error('Error fetching latest mangas:', error);
      set({ loading: false });
    }
  },

  getsearchResults: async (query) => {
    set({ loading: true });
    try {
      const response = await fetch(`${baseurl}/manga?title=${query}`);
      const data = await response.json();
      console.log('API Response Data:', data);
      const mangas = data.data;
      console.log('API Response Mangas:', mangas);
      const mangasWithCovers = await Promise.all(mangas.map(async (manga) => {
        const coverArtRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
        const coverResponse = await fetch(`${baseurl}/cover/${coverArtRelationship.id}`);
        const coverData = await coverResponse.json();
        console.log('Cover Data:', coverData);
        return { ...manga, coverFilename: coverData.data.attributes.fileName };
      }));
      console.log('Mangas with Covers:', mangasWithCovers);
      set({ searchResults: mangasWithCovers, loading: false });
    } catch (error) {
      console.error('Error fetching search results:', error);
      set({ loading: false });
    }
  },

  getMangaDetails: async (manga) => {
    set({ loading: true });
    try {
      const title = manga.attributes.title || manga.attributes.altTitles.find(altTitle => altTitle.language === 'ja').title;
      const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
      const coverResponse = await fetch(`${baseurl}/cover/${coverArt.id}`);
      const coverData = await coverResponse.json();
      const mangaWithCover = { ...manga, coverFilename: coverData.data.attributes.fileName };
      set({ mangaDetails: mangaWithCover, loading: false });
    } catch (error) {
      console.error('Error fetching manga details:', error);
      set({ loading: false });
      throw error;
    }
  },

  clearsearchResults: () => set({ searchResults: [] }),

  clearAll: () => set({ popularMangas: [], topMangas: [], latestMangas: [], searchResults: [] }),

}));

export const useThemeStore = create((set) => ({

  theme: lighttheme,
  toggleTheme: () => set((state) => ({
    theme: state.theme === lighttheme ? darktheme : lighttheme,
  })),
}));

const zustandMMKVStorage = {
  setItem: (key, data) => storage.set(key, data),
  getItem: (key) => storage.getString(key),
  removeItem: (key) => storage.delete(key),
}


