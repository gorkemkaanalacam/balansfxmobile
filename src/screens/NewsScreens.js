import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import FxStreetToken from '../hook/fxStreetToken';
import fxstreetsubscriptions from '../api/fxstreetsubscriptions';
import CustomProgressBar from '../components/customProgressBar';
import moment from "moment";


const NewsScreens = ({ navigation }) => {
  const [isProgress, setProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [news, setNews] = useState([]);

  const getNews = async () => {
    setProgress(true);
    const fxtoken = await FxStreetToken();
    const response = await fxstreetsubscriptions.get('/v4/tr/post/filterfull/GeneralFeed?bodyType=PlainText', { headers: { Authorization: "Bearer " + fxtoken.token } });
    setProgress(false);
    setNews(response.data.Values);
    setRefreshing(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    isProgress ?
      <CustomProgressBar />
      :
      
      <View style={{ backgroundColor: "#fff" }}>
        <FlatList
          data={news}
          keyExtractor={item => item.Id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NewsDetail', {item})
                }
              >
                <View style={styles.container}>
                  <Text style={styles.title}>{item.Title}</Text>
                  <Text style={styles.summary}>
                    {item.Summary}
                  </Text>
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
            <RefreshControl refreshing={refreshing} onRefresh={getNews} />
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
  }
});

export default NewsScreens;