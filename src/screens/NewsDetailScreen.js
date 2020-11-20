import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import moment from "moment";


const NewsDetailScreen = (props) => {
    const item = props.route.params.item;
    return (
        <View style={{ backgroundColor: "#fff", flex:1, flexDirection:"column"}}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ flex: 1, color: '#87888F' }}>
                        {moment(item.PublicationDate).format('L')}
                    </Text>
                    <Text style={{ flexShrink: 0, color: '#87888F' }}>
                        {moment(item.PublicationDate).format('LT')}
                    </Text>
                </View>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.summary}>
                    {item.HTML ? item.HTML : item.Summary}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        color: "#04091E",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 30
    },
    summary: {
        textAlign:"center",
        color: "#87888F",
        fontSize: 13,
        fontWeight: "400",
        marginTop: 15,
        marginBottom: 15
    }
});

export default NewsDetailScreen;