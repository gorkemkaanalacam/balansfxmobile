import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, RefreshControl, Image, Picker } from 'react-native';
import exchange from '../api/exchange';
import CustomProgressBar from '../components/customProgressBar';


const ExchangeList = ({ navigation }) => {
  const [isProgress, setProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [base, setBase] = useState("TRY");

  const getExchangeList = async () => {
    setProgress(true);
    const query = "?base=" + base;
    const response = await exchange.get('/latest' + query);
    setProgress(false);
    const rateList = response.data.rates;
    setRefreshing(false);
    // const exchangeList = [];
    // for (let i = 0; i < Object.keys(exchanges).length; i++) {
    //   const exchangeObjectString = '{"' + Object.keys(exchanges)[i] + '":' + Object.values(exchanges)[i] + '}';
    //   const exchangeObject = JSON.parse(exchangeObjectString.toString());
    //   exchangeList.push(exchangeObject);
    // }
    const exchangeList = Object.keys(rateList).map((key) => [String(key), rateList[key]]);
    setExchanges(exchangeList);
  };

  useEffect(() => {
    getExchangeList();
  }, [base]);

  return (
    isProgress ?
      <CustomProgressBar />
      :

      <View style={{ backgroundColor: "#fff" }}>
        <View style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row" }}>
          <Picker
            selectedValue={base}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setBase(itemValue)}
          >
            <Picker.Item label="TRY" value="TRY" />
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="AUD" value="AUD" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="CHF" value="CHF" />
            <Picker.Item label="JPY" value="JPY" />
          </Picker>
        </View>
        <View style={{flexDirection:"row", marginTop:20, paddingBottom:10, marginHorizontal:20}}>
        <Text style={{...styles.listTitles}}>Para Birimi</Text>
        <Text style={{...styles.listTitles, textAlign:'right'}}>Fiyat</Text>
      </View>
        <FlatList
          data={exchanges}
          keyExtractor={item => item[0]}
          renderItem={({ item }) => {

            return (
              <View style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.amount}>{base + "/" + item[0]}</Text>
                  </View>
                  {/* <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.amount}>{(1/item[1]).toFixed(4)}</Text>
                    <Text style={styles.subtitles}>Published</Text>
                  </View> */}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{...styles.amount, color:'#5DD589'}}>{(item[1]).toFixed(4)}</Text>
                    {/* <Text style={styles.subtitles}>Previous</Text> */}
                  </View>
                </View>
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getExchangeList} />
          }
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9E9E9"
  },
  subtitles: {
    color: "#ACB6C5",
    fontSize: 11
  },
  amount: {
    color: "#04091E",
    fontSize: 14,
    fontWeight: "700"
  },
  listTitles:{
    flex:1,
    color:'#04091E',
    fontWeight:'700',
    fontSize:13
  }
});

export default ExchangeList;