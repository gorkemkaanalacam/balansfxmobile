import React from 'react';
import { Text, View, RefreshControl, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const activeSignals = ({signals, refreshing, getSignals, navigation}) => {
  signals = signals.filter(x => x.signalStatus == 1);
  return (
  <View style={{ backgroundColor: "#fff" }}>
  <View style={{flexDirection:"row", marginTop:20, paddingBottom:10, borderBottomWidth: 1, borderBottomColor: "#E9E9E9"}}>
    <Text style={{...styles.listTitles,  marginLeft:10}}>SEMBOL</Text>
    <Text style={styles.listTitles}>FİYAT</Text>
    <Text style={{...styles.listTitles, textAlign:'center'}}>TİP</Text>
    <Text style={{...styles.listTitles, textAlign:'center'}}>DURUM</Text>
  </View>
  <FlatList
    data={signals}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => {

      const RenderType = () => {
        if (item.type == 1) {
          return <Text style={{ ...styles.type, backgroundColor: '#5DD589' }}>Al</Text>
        }
        else if (item.type == 2) {
          return <Text style={{ ...styles.type, backgroundColor: '#FF0516' }}>Sat</Text>
        }
        return null;
      };

      const RenderStatus = () => {
        if (item.signalStatus == 1) {
          return <Text style={{ flex: 1, textAlign: "center" }}>Aktif</Text>
        }
        else if (item.signalStatus == 2) {
          return <Text style={{ flex: 1, textAlign: "center" }}>Pasif</Text>
        }
        else if (item.signalStatus == 3) {
          return <Text style={{ flex: 1, textAlign: "center" }}>Başarılı</Text>
        }
        else if (item.signalStatus == 4) {
          return <Text style={{ flex: 1, textAlign: "center" }}>Başarısız</Text>
        }
      };
      return (
        <TouchableOpacity onPress={() => navigation.navigate("TradingDetail", item)}>
          <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={{ flexDirection: "column", alignItems: "stretch", flex: 1 }}>
              <Text style={{ borderBottomWidth: 1, borderBottomColor: '#E9E9E9', fontWeight: '700', color: '#04091E', paddingBottom: 3, fontSize: 12 }}>
                {"AÇ: " + item.currentPosition}
              </Text>
              <Text style={{ marginTop: 3, color: '#04091E', fontWeight: '700', fontSize: 12 }}>
                {"TP: " + item.takeProfit}
              </Text>
              <Text style={{ marginTop: 3, color: '#FF0516', fontWeight: '700', fontSize: 12 }}>
                {"SL: " + item.stopLoss}
              </Text>
            </View>
            <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignItems:'center'}}>
              <RenderType />
            </View>
            <RenderStatus />
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

  export default activeSignals;