import React from "react";
import { View, Text } from "react-native";
import { historystorage } from "../../store/mmkv";

const HistoryScreen = ( { route } ) => {
    const { id } = route.params;
    
    const [history, setHistory] = useState([]);
    
    return (
        <View>
            <Text>{history}</Text>
        </View>
    );
};