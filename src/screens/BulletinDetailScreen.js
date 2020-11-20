import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import moment from "moment";


const BulletinDetailScreen = (props) => {
    const [imageheight, setImageHeight] = useState(0);
    const [imagewidth, setImageWidth] = useState(0);
    const item = props.route.params.item;
    const windows = Dimensions.get('window');
    let iheight;
    if(item.ImageUrl){
        Image.getSize(item.ImageUrl, (width, height) => { setImageHeight(height); setImageWidth(width); });
        iheight = (imageheight * (windows.width/imagewidth));
    }
    

    return (
        <View style={{ backgroundColor: "#fff", flex:1, flexDirection:"column"}}>
            <ScrollView>
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
                {item.ImageUrl ? <Image source={{uri:item.ImageUrl}} style={{resizeMode:'contain', width:windows.width - 40, height:iheight < 1000 ? iheight : 0, marginTop:20}}/> : null}
                
                <Text style={styles.summary}>
                    {item.Detail}
                </Text>
            </View>
            </ScrollView>
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

export default BulletinDetailScreen;