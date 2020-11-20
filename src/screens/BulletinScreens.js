import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import bulletin from '../api/bulletin';
import CustomProgressBar from '../components/customProgressBar';
import moment from "moment";


const BulletinScreens = ({ navigation }) => {
  const [isDaily, setIsDaily] = useState(true);
  const [isProgress, setProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [bulletins, setBulletins] = useState([]);

  const getBulletins = async () => {
    setProgress(true);
    const query = isDaily ? '/GetDailyBulletins' : '/GetWeeklyBulletins'
    const response = await bulletin.get(query);
    setProgress(false);
    setBulletins(response.data.List);
    setRefreshing(false);
  };

  useEffect(() => {
    getBulletins();
  }, [isDaily]);

  return (
    isProgress ?
      <CustomProgressBar />
      :
      
      <View style={{ backgroundColor: "#fff" }}>
        <View style={styles.titleView}>
            <TouchableOpacity onPress={() => setIsDaily(true)}>
              <Text style={isDaily ? styles.active : styles.inactive}>Günlük</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsDaily(false)}>
              <Text style={isDaily ? styles.inactive : styles.active}>Haftalık</Text>
            </TouchableOpacity>
        </View>
        <FlatList
          data={bulletins}
          keyExtractor={item => item.Id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BulletinDetail', {item})
                }
              >
                <View style={styles.container}>
                  <Text style={styles.title}>{item.Title}</Text>
                  {/* <Text style={styles.summary}>
                    {item.Summary}
                  </Text> */}
                  <View style={{ flexDirection: "row", marginBottom:10 }}>
                    <Text style={{ flex: 1, color:'#87888F'}}>
                      {moment(item.PublicationDate).format('L')}
                    </Text>
                    <Text style={{ flexShrink: 0, color:'#87888F'}}>
                      {moment(item.PublicationDate).format('LT')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getBulletins} />
          }
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9E9E9"
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
  },
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

export default BulletinScreens;