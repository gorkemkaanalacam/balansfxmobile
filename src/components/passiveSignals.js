import React from 'react';
import {
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import moment from 'moment';

const PassiveSignals = ({ signals, refreshing, getSignals, navigation }) => {
  signals = signals.filter((x) => x.Status == 3 || x.Status == 4);
  return (
    <>
      <FlatList
        contentContainerStyle={{
          backgroundColor: '#ffffff',
          paddingBottom: 80,
        }}
        data={signals}
        keyExtractor={(item) => item.Id.toString()}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#E9E9E9',
              }}
            >
              <Text style={{ ...styles.listTitles, marginLeft: 10 }}>
                SEMBOL
              </Text>
              <Text style={styles.listTitles}>TARİH</Text>
              <Text style={{ ...styles.listTitles, textAlign: 'center' }}>
                SONUÇ
              </Text>
              <Text
                style={{ ...styles.listTitles, textAlign: 'center' }}
              ></Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          const RenderStatus = () => {
            if (item.Status == 3) {
              return (
                <Text style={{ ...styles.type, backgroundColor: '#5DD589' }}>
                  Kar
                </Text>
              );
            } else if (item.Status == 4) {
              return (
                <Text style={{ ...styles.type, backgroundColor: '#FF0516' }}>
                  Zarar
                </Text>
              );
            }
          };

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('TradingDetail', item)}
            >
              <View style={styles.container}>
                <Text style={styles.title}>{item.Name}</Text>
                <Text style={{ color: '#C4CAD4', fontSize: 12, flex: 1 }}>
                  {moment(item.OpeningDate).format('L')}
                </Text>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <RenderStatus />
                </View>
                <Text style={{ color: '#04091E', flex: 1 }}>{item.Profit}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getSignals} />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    color: '#04091E',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginLeft: 10,
  },
  summary: {
    color: '#87888F',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 15,
  },
  type: {
    textAlign: 'center',
    height: 20,
    width: 50,
    color: '#FFFFFF',
    borderRadius: 5,
    fontSize: 11,
    textAlignVertical: 'center',
  },
  listTitles: {
    flex: 1,
    color: '#04091E',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default PassiveSignals;
