import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, } from 'react-native';
import globalStyles , { container, text, header, button, input, buttonText } from '../context/globalStyles';

const baseUrl = 'https://api.mangadex.org';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
   
    const searchManga = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/manga?title=${query}&limit=10`);
            const data = await response.json();
            setResults(data.data);
        } catch (error) {
            console.error('Error fetching manga:', error);
        }
        setLoading(false);
    };

    return (
        <View style={container}>
            <TextInput 
                style={input}
                placeholder="Search Manga"
                value={query}
                onChangeText={setQuery}
            />
            <Button 
                style={button} 
                title="Search" 
                onPress={searchManga}  
            />
            {loading && <Text>Loading...</Text>}
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={item}>
                        <Text style={title}>{item.attributes.title.en || 'No title available'}</Text>
                    </View>
                )}
            />
        </View>
    );
};
