import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useMangaStore } from '../../store/storage';
import dummydata from '../../assets/dummydata.json';
import { useThemeStore } from '../../store/storage';


const search = ({ navigation }) => {
    const {getsearchResults, searchResults, loading , } = useMangaStore();
    const [query, setQuery] = useState('');
    const {theme} = useThemeStore();

    const renderManga = (manga) => {
        return (
            <View>
            <TouchableOpacity
              key={manga.id}
              onPress={() => {navigation.navigate('Manga Details', { manga: manga })}}
            >
              <Image
                source={{ uri: `https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFilename}`}}
                style={styles(theme).image}
              />
            </TouchableOpacity>
          </View>
          );
    };
    
    
{loading && <Text>Loading...</Text>}

    return (
        <View style={styles(theme).container}>
            <TextInput 
                style={styles(theme).input}
                placeholder="Search Manga"
                value={query}
                onChangeText={setQuery}
            />
<Button 
    title="Search" 
    color="midnightblue"
    onPress={() => {getsearchResults(query);
        console.log(searchResults);
    }}
/>
            <FlatList
                numColumns={3}
                ListHeaderComponent={
                    <Text style={styles(theme).title}>Search Results for {query}</Text>
                }
                data={searchResults}
                renderItem={({ item }) => renderManga(item)}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: theme.colors.background,
    },
    image: {
        width: 150,
        height: 225,
        borderRadius: 7,
        border: '3px solid black',
        marginBottom: 10,
        marginRight: 15,
        resizeMode: 'cover',
    },
    link: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.colors.text,
        fontFamily: theme.fonts.main,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.text,
        fontFamily: theme.fonts.main,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: theme.colors.primary,
        color: theme.colors.text,
        fontFamily: theme.fonts.main,
    }, 
    button: {
        margin: 12,
    }
});


export default search;