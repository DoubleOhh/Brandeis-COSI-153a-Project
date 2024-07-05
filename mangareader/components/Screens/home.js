import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { useEffect, useState } from 'react';
import {useMangaStore , useHistoryStore, useThemeStore} from '../../store/storage';



const HomeScreen = ({ navigation }) => {
    const { popularMangas, loading, getPopularMangas, topMangas, getTopMangas, latestMangas, getLatestMangas, } = useMangaStore();
    const { history, addHistory } = useHistoryStore();
    const { theme } = useThemeStore();

    useEffect(() => {
      getPopularMangas();
      getTopMangas();
      getLatestMangas();
    }, []);
  
    const renderManga = (manga) => {
            return (
                <View>
                <TouchableOpacity
                  key={manga.id}
                  onPress={() => {navigation.navigate('Manga Details', { manga: manga }), addHistory(manga)}}
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
        <ScrollView>
        <Text style={styles(theme).title}>Latest Updates</Text>
        <FlatList horizontal={true}
        data={topMangas}
        renderItem={({ item }) => renderManga(item)}
        keyExtractor={(item) => item.id}
        />
        <Text style={styles(theme).title}>Popular Mangas</Text>
        <FlatList horizontal={true}
        data={popularMangas}
        renderItem={({ item }) => renderManga(item)}
        keyExtractor={(item) => item.id}
        />
        <Text style={styles(theme).title}>Latest Mangas</Text>
        <FlatList horizontal={true}
        data={latestMangas}
        renderItem={({ item }) => renderManga(item)}
        keyExtractor={(item) => item.id}
        />
        </ScrollView>
        </View>
    );
  };
  
  const styles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    column: {
      flex: 1,
      flexDirection: "column",
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
    text: {
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
    loadingText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.main,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.text,
      fontFamily: theme.fonts.main,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 22,
      color: theme.colors.text,
      fontFamily: theme.fonts.main,
    }
  });

export default HomeScreen;
