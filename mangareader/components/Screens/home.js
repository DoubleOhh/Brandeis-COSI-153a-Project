import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { useEffect, } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
                <View style={styles(theme).container}>
                <TouchableOpacity
                  key={manga.id}
                  onPress={() => {navigation.navigate('Manga Details', { manga: manga }), addHistory(manga)}}
                >
                  <ImageBackground
                    source={{ uri: `https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFilename}`}}
                    style={styles(theme).image}>
                    <LinearGradient 
                      locations={[0, 2]}
                      colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .65)']} 
                      style={{height : '100%', width : '100%'}}>
                      <View style={{
                        flexDirection: 'row', 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        justifyContent: 'center', 
                        alignItems: 'flex-end'}}>
                        <Text numberOfLines={2} style = {styles(theme).text}>
                        {manga.attributes.title.en != null ? manga.attributes.title.en : manga.attributes.title['ja-ro']} </Text>
                      </View>
                    </LinearGradient>
                    
                  </ImageBackground>
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
      overflow: 'hidden',
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
