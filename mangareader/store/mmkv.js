import { MMKV } from 'react-native-mmkv';

export const historystorage = new MMKV({
    id: 'history',
})

export const likestorage = new MMKV({
    id: 'likes',
})