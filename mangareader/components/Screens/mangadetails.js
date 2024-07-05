import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useGlobalContext } from '../../context/global';
import { useMangaStore } from '../../store/storage';
import CacheImage from '../../store/Imagecaching';

const mangaDetails = ({ route }) => {
  const { manga } = route.params;
  const [chapters, setChapters] = useState([]);



  if (!manga) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading manga details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFilename}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{manga.attributes.title.en}</Text>
      <Text style={styles.header}>Chapters: {manga.attributes.lastChapter}</Text>
      <Text style={styles.description}>{manga.attributes.description.en}</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default mangaDetails;
