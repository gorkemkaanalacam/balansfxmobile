import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ActiveSignalDetail = ({ item }) => {
  const RenderType = () => {
      if (item.type == 1) {
          return <Text style={{ ...styles.type, backgroundColor: '#5DD589' }}>Al</Text>
      }
      else if (item.type == 2) {
          return <Text style={{ ...styles.type, backgroundColor: '#FF0516' }}>Sat</Text>
      }
      return null;
  };

  return (
      <View style={{backgroundColor: '#ffffff', paddingHorizontal: 20, paddingTop: 40 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 20, alignItems: "center" }}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={{flex:1, alignItems:'center'}}>
                  <RenderType />
              </View>
              <Text style={{ fontWeight: '700', color: '#04091E', fontSize: 18, flex:1, textAlign:"right" }}>
                  {item.currentPosition}
              </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
              <View style={{}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Zarar Durdur</Text>
                  <Text style={{ fontSize: 18, color: '#FF052F', fontWeight:'700' }}>{item.stopLoss}</Text>
              </View>
              <View style={{marginLeft:'auto'}}>
                  <Text style={{ fontSize: 13, color: '#C4CAD4' }}>Kar Al</Text>
                  <Text style={{ fontSize: 18, color: '#5DD589', fontWeight:'700' }}>{item.takeProfit}</Text>
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

export default ActiveSignalDetail;