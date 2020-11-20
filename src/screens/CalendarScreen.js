import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, RefreshControl, Button, Image } from 'react-native';
import FxStreetToken from '../hook/fxStreetToken';
import fxstreetcalendar from '../api/fxstreetcalendar';
import CustomProgressBar from '../components/customProgressBar';
import moment from "moment";
import 'moment/locale/tr';
import DateTimePicker from '@react-native-community/datetimepicker';


const CalendarScreen = ({ navigation }) => {
  const [isProgress, setProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  //const [event, setEvent] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const getEvents = async () => {
    setProgress(true);
    const fxtoken = await FxStreetToken();
    const dates = moment(startDate).format("YYYY-MM-DD");
    const query = "&start=" + dates + "&end=" + dates;
    const response = await fxstreetcalendar.get('/v4.1/eventdate?countrycode=tr' + query, { headers: { Authorization: "Bearer " + fxtoken.token } });
    setProgress(false);
    //setEvent(response.data);
    setEvents(response.data);
    setRefreshing(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const onChange = (event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate || startDate;
      setShow(Platform.OS === 'ios');
      setStartDate(currentDate);
      getEvents();
      //filterList(currentDate);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const filterList = (currentDate) => {
    const dataList = event.filter(x => moment(x.DateUtc).format("L") == moment(currentDate).format("L"));
    console.log(moment(currentDate).format("YYYY-MM-DD"));
    setProgress(false);
    setEvents(dataList);
  };

  return (
    isProgress ?
      <CustomProgressBar />
      :

      <View style={{ backgroundColor: "#fff" }}>
        <View style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row" }}>
          <Button onPress={showDatepicker} color='gray' title="Tarih Filtresi" />
          <Text>{moment(startDate).format("L")}</Text>
          <Button onPress={getEvents} color='gray' title="Tümünü Göster" />
          {/* <Button onPress={showDatepicker} color='gray' title="EndDate"/> */}
          {show && <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
          }
        </View>
        <FlatList
          data={events}
          keyExtractor={item => item.Id}
          renderItem={({ item }) => {

            let imageSource;

            switch (item.Volatility) {
              case 1:
                imageSource = require("../../assets/1v.png");
                break;
              case 2:
                imageSource = require("../../assets/2v.png");
                break;
              case 3:
                imageSource = require("../../assets/3v.png");
                break;
              default:
                imageSource = require("../../assets/default.png");
            }

            return (
              <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ ...styles.amount, width: 60 }}>{moment(item.DateUtc).locale("tr").format('LT')}</Text>
                  <Text style={{ ...styles.amount, flex: 1, textAlign: "center" }}>{"(" + item.Event.InternationalCountryCode + ") " + item.Event.Name}</Text>
                  <View style={{ width: 60, alignItems: 'flex-end' }}>
                    <Image source={imageSource} style={{ width: 40, height: 20, resizeMode: "contain" }} />
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subtitles}>Olasılık</Text>
                    <Text style={styles.amount}>{item.Actual}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.subtitles}>Beklenti</Text>
                    <Text style={styles.amount}>{item.Consensus}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.subtitles}>Önceki</Text>
                    <Text style={styles.amount}>{item.Previous}</Text>
                  </View>
                </View>
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getEvents} />
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
  }
});

export default CalendarScreen;