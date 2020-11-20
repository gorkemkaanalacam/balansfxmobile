import React from 'react';
import { Text, View, RefreshControl, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import moment from "moment";

const PassiveSignals = ({signals, refreshing, getSignals, navigation}) => {
  signals = signals.filter(x => x.signalStatus != 1);
  return (
  <View style={{ backgroundColor: "#fff" }}>
  <View style={{flexDirection:"row", marginTop:20, paddingBottom:10, borderBottomWidth: 1, borderBottomColor: "#E9E9E9"}}>
    <Text style={{...styles.listTitles,  marginLeft:10}}>SEMBOL</Text>
    <Text style={styles.listTitles}>TARİH</Text>
    <Text style={{...styles.listTitles, textAlign:'center'}}>SONUÇ</Text>
    <Text style={{...styles.listTitles, textAlign:'center'}}></Text>
  </View>
  <FlatList
    data={signals}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => {

      const RenderStatus = () => {
        if (item.signalStatus == 3) {
          return <Text style={{ ...styles.type, backgroundColor: '#5DD589' }}>Kar</Text>
        }
        else if (item.signalStatus == 4) {
          return <Text style={{ ...styles.type, backgroundColor: '#FF0516' }}>Zarar</Text>
        }
      };

      return (
        <TouchableOpacity onPress={() => navigation.navigate("TradingDetail", item)}>
          <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={{color: '#C4CAD4', fontSize: 12, flex:1 }}>
                {moment(item.openingDate).format('L')}
              </Text>
            <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignItems:'center'}}>
              <RenderStatus />
            </View>
            <Text style={{color: '#04091E', flex:1 }}>
                {item.profit}
              </Text>
          </View>
        </TouchableOpacity>
      );
    }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={getSignals} />
    }
  />
</View>
  );
}

  

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#E9E9E9",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20
  },
  title: {
    color: "#04091E",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginLeft:10
  },
  summary: {
    color: "#87888F",
    fontSize: 13,
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 15
  },
  type: {
    textAlign: "center",
    height: 20,
    width: 50,
    color: '#FFFFFF',
    borderRadius: 5,
    fontSize: 11,
    textAlignVertical: "center",
  },
  listTitles:{
    flex:1,
    color:'#04091E',
    fontWeight:'700',
    fontSize:12
  }
});

  export default PassiveSignals;