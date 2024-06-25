import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useGlobalContext } from '../../context/global';

const mangadetails = ({ route }) => {
  const { id } = route.params;
  const { getMangaDetails } = useGlobalContext();
  const [mangaDetails, setMangaDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const details = await getMangaDetails(id);
        setMangaDetails(details);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!mangaDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading manga details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://uploads.mangadex.org/covers/${mangaDetails.id}/${mangaDetails.coverFilename}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{mangaDetails.attributes.title.en}</Text>
      <Text style={styles.description}>{mangaDetails.attributes.description.en}</Text>
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
    width: '100%',
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
});

export default mangadetails;
