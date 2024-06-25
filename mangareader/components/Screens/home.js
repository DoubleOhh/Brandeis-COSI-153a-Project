import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useGlobalContext } from '../../context/global';


const HomeScreen = ({ navigation }) => {
    const { getPopularMangas, popularMangas, loading } = useGlobalContext();

    useEffect(() => {
      getPopularMangas();
    }, []);
  
    const renderManga = (mangas) => {
      return mangas.map((manga) => {
        return (
          <TouchableOpacity
            key={manga.id}
            onPress={() => navigation.navigate('mangadetails', { id: manga.id })}
            style={styles.link}
          >
            <Image
              source={{ uri: `https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFilename}` }}
              style={styles.image}
            />
            <Text style={styles.mangaTitle}>{manga.attributes.title.en}</Text>
          </TouchableOpacity>
        );
      });
    };
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <ScrollView style={styles.container}>
        {renderManga(popularMangas)}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    link: {
      marginBottom: 20,
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 225,
      borderRadius: 10,
      marginBottom: 10,
    },
    mangaTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default HomeScreen;
