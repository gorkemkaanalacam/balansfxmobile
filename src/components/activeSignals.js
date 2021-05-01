import React from 'react';
import {
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const activeSignals = ({ signals, refreshing, getSignals, navigation }) => {
  signals = signals.filter((x) => x.Status == 1);
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#E9E9E9',
        }}
      >
        <Text style={{ ...styles.listTitles, marginLeft: 10 }}>SEMBOL</Text>
        <Text style={styles.listTitles}>FİYAT</Text>
        <Text style={{ ...styles.listTitles, textAlign: 'center' }}>TİP</Text>
        <Text style={{ ...styles.listTitles, textAlign: 'center' }}>DURUM</Text>
      </View>
      <FlatList
        contentContainerStyle={{
          backgroundColor: '#ffffff',
          paddingBottom: 150,
        }}
        data={signals}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => {
          const RenderType = () => {
            if (item.SignalType == 'Buy') {
              return (
                <Text style={{ ...styles.type, backgroundColor: '#5DD589' }}>
                  Al
                </Text>
              );
            } else if (item.SignalType == 'Sell') {
              return (
                <Text style={{ ...styles.type, backgroundColor: '#FF0516' }}>
                  Sat
                </Text>
              );
            }
            return null;
          };

          const RenderStatus = () => {
            if (item.Status == 1) {
              return (
                <Text style={{ flex: 1, textAlign: 'center' }}>Aktif</Text>
              );
            } else if (item.Status == 2) {
              return (
                <Text style={{ flex: 1, textAlign: 'center' }}>Pasif</Text>
              );
            } else if (item.Status == 3) {
              return (
                <Text style={{ flex: 1, textAlign: 'center' }}>Başarılı</Text>
              );
            } else if (item.Status == 4) {
              return (
                <Text style={{ flex: 1, textAlign: 'center' }}>Başarısız</Text>
              );
            }
          };
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('TradingDetail', item)}
            >
              <View style={styles.container}>
                <Text style={styles.title}>{item.Name}</Text>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#E9E9E9',
                      fontWeight: '700',
                      color: '#04091E',
                      paddingBottom: 3,
                      fontSize: 12,
                    }}
                  >
                    {'AÇ: ' + item.OpenWhen}
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      color: '#04091E',
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {'TP: ' + item.TakeProfit}
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      color: '#FF0516',
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {'SL: ' + item.StopLoss}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
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

export default activeSignals;
