import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActiveSignalDetail from "../components/activeSignalDetail";
import PassiveSignalDetail from "../components/passiveSignalDetail";


const TradingDetailScreen = ({ route }) => {
    const item = route.params;
    return (
        <View>
        {
            item.signalStatus == 1 ?
            <ActiveSignalDetail item={item}/>

            :

            <PassiveSignalDetail item={item}/>
        }
        </View>
        
        
    );
};

const styles = StyleSheet.create({
    title: {
        color: "#04091E",
        fontSize: 22,
        fontWeight: "700",
        flex:1
    },
    type: {
        textAlign: "center",
        height: 20,
        width: 50,
        color: '#FFFFFF',
        borderRadius: 5,
        fontSize: 11,
        textAlignVertical: "center",
    }
});

export default TradingDetailScreen;