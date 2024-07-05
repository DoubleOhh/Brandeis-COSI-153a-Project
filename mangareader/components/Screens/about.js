import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useThemeStore } from '../../store/storage';



const About = () => {
  const { theme } = useThemeStore();
  return (
    <ScrollView style={styles(theme).container}>
      <View style={styles(theme).content}>
        <Text style={styles(theme).title}>About Manga App</Text>
        <Text style={styles(theme).paragraph}>
          Welcome to My Manga App, your ultimate destination for reading and discovering manga. Our app brings you the latest and most popular manga titles, allowing you to dive into the world of Japanese comics and track what you have read with ease.
        </Text> 
        <Text style={styles(theme).paragraph}>
          MangaDex App provides an extensive library of manga, ranging from classic series to the hottest new releases. Whether you're a long-time manga fan or new to the scene, you'll find something to enjoy.
        </Text>
        <Text style={styles(theme).paragraph}>
          Our app is designed to offer a seamless and enjoyable reading experience. You can browse, search, and read about manga with just a few taps. Stay up to date with the latest chapters and never miss an update from your favorite series.
        </Text>
      </View>
    </ScrollView>
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
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
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
    fontSize: 20,
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
  },
});

export default About;
