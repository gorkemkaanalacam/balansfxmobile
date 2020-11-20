import React, {useState} from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const PortfolioScreen = ({ navigation }) => {
  const [isForecast, setIsForeCast] = useState(true);

    return (
        <View style={{backgroundColor:"#ffffff"}}>
          <View style={styles.titleView}>
            <TouchableOpacity onPress={() => setIsForeCast(true)}>
              <Text style={isForecast ? styles.active : styles.inactive}>FORECAST</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsForeCast(false)}>
              <Text style={isForecast ? styles.inactive : styles.active}>TRADING POSITION</Text>
            </TouchableOpacity>
          </View>
        {/* <Text>Settings screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
      </View>
    );
  };

  const styles = StyleSheet.create({
    titleView: {
      marginHorizontal:20, 
      paddingVertical:20, 
      flexDirection:"row", 
      justifyContent:"space-evenly", 
      alignItems:"center",
      borderBottomWidth:1,
      borderBottomColor:"#E6E6E6"
    },
    inactive: {
      color: "#C4CAD4",
      fontSize: 13
    },
    active: {
      borderRadius:5,
      color: "#04091E",
      padding:10,
      fontSize: 13,
      fontWeight: "700",
      backgroundColor:"#C4CAD4"
    }
  });

  export default PortfolioScreen;