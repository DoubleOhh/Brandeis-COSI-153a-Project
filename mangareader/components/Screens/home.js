import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';


const HomeScreen = () => {
    const { popularMangas, isSearching, searchResults, topMangas, latestMangas, chapters, currentTheme} = useGlobalContext();


    const renderMangaItem = () => {
        if (!isSearching) {
            return popularMangas.map((manga) => {
                return <Link to={`/manga/${manga.id}`} key={manga.id} style={styles.link}>
                    <Image 
                        source={{ uri: `https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFilename}`}}
                        style={styles.image}
                    />
                </Link>
            }
            )
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Popular Mangas</Text>
                <Text style={styles.headerText}>View All</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={popularMangas}
                    renderItem={renderMangaItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />  
            </View>
        </View>
    ); 

    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        alignItems: 'center',
    },
    link: {
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});



export default HomeScreen;