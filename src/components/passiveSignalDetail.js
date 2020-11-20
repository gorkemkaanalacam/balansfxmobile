import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from "moment";

const PassiveSignalDetail = ({ item }) => {
  const RenderType = () => {
      if (item.signalStatus == 3) {
          return <Text style={{ ...styles.type, backgroundColor: '#5DD589' }}>Kar</Text>
      }
      else if (item.signalStatus == 4) {
          return <Text style={{ ...styles.type, backgroundColor: '#FF0516' }}>Zarar</Text>
      }
      return null;
  };

  return (
      <View style={{backgroundColor: '#ffffff', paddingHorizontal: 20, paddingTop: 40 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 20, alignItems: "center" }}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={{flex:1}}>
                  <RenderType />
              </View>
              <Text style={{ fontWeight: '700', color: '#04091E', fontSize: 18, flex:1, textAlign:"right" }}>
                  {item.profit}
              </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Zarar Durdur</Text>
                  <Text style={{ fontSize: 18, color: '#FF052F', fontWeight:'700' }}>{item.stopLoss}</Text>
              </View>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Açılış</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700' }}>{moment(item.openingDate).format('L')}</Text>
              </View>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4', textAlign:"right" }}>Açılış Fiyatı</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700', textAlign:"right" }}>{item.openingPrice}</Text>
              </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Kar Al</Text>
                  <Text style={{ fontSize: 18, color: '#5DD589', fontWeight:'700' }}>{item.takeProfit}</Text>
              </View>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Kapanış</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700' }}>{moment(item.closingDate).format('L')}</Text>
              </View>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4', textAlign:"right" }}>Kapanış Fiyatı</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700', textAlign:"right" }}>{item.closingPrice}</Text>
              </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingTop: 20, alignItems: "center", borderTopColor:"#f1f1f1", borderTopWidth:1 }}>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Kaldıraç</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700' }}>{item.leverage}</Text>
              </View>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Marjin</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700' }}>{item.margin}</Text>
              </View>
              <View style={{flex:1}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4', textAlign:"right" }}>Kar/Zarar</Text>
                  <Text style={{ fontSize: 13, color: '#04091E', fontWeight:'700', textAlign:"right" }}>{item.profit}</Text>
              </View>
          </View>
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

export default PassiveSignalDetail;