import React, { useEffect, useState } from 'react';
import { Text, View, AsyncStorage, RefreshControl, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CustomProgressBar from '../components/customProgressBar';
import ActiveSignals from '../components/activeSignals';
import PassiveSignals from '../components/passiveSignals';
import signalapi from '../api/signal';


const TradingScreen = ({ navigation }) => {
  const [isProgress, setProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isActiveSignalList, setActiveSignalList] = useState(true);
  const [signals, setSignals] = useState([]);

  const getSignals = async () => {
    setProgress(true);
    const token = await AsyncStorage.getItem("token");
    const response = await signalapi.get('/List', { headers: { Authorization: "Bearer " + token } });
    setProgress(false);
    setSignals(response.data.data);
    setRefreshing(false);
  };

  useEffect(() => {
    getSignals();
  }, [isActiveSignalList]);

  return (
    isProgress ?

    <CustomProgressBar />
    :

    <View style={{backgroundColor:"#FCFCFC"}}>
      <View style={styles.titleView}>
            <TouchableOpacity style={{flex:1}} onPress={() => setActiveSignalList(true)}>
              <Text style={isActiveSignalList ? styles.active : styles.inactive}>Aktif Sinyaller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={() => setActiveSignalList(false)}>
              <Text style={isActiveSignalList ? styles.inactive : styles.active}>Kapanan Sinyaller</Text>
            </TouchableOpacity>
      </View>
      {
        isActiveSignalList ?
        <ActiveSignals signals={signals} refreshing={refreshing} getSignals={getSignals} navigation={navigation}/>
        :
        <PassiveSignals signals={signals} refreshing={refreshing} getSignals={getSignals} navigation={navigation}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginHorizontal:20,
    marginVertical:10,
    flexDirection:"row", 
    alignItems:"stretch"
  },
  inactive: {
    color: "#C8C8C8",
    backgroundColor:"#F2F2F2",
    textAlign:'center',
    paddingVertical:15,
    fontSize: 13
  },
  active: {
    borderRadius:5,
    color: "#04091E",
    fontSize: 13,
    textAlign:'center',
    fontWeight: "700",
    paddingVertical:15,
    backgroundColor:"#FFF"
  }
});

export default TradingScreen;