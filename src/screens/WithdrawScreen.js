import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, AsyncStorage } from 'react-native';
import CustomProgressBar from '../components/customProgressBar';
import { AuthContext } from '../context/authContext';
import homeApi from '../api/home';

const WithdrawScreen = ({ navigation }) => {
  const context = React.useContext(AuthContext);
  const [isProgress, setProgress] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const withdraw = async () => {
    setProgress(true);
    const userToken = await AsyncStorage.getItem('token');
    if (!userToken) {
      context.authContext.signOut();
    }

    const response = await homeApi.post("/Withdraw?accountNumber=" + accountNumber + "&amount=" + amount, null, { headers: { Authorization: "Bearer " + userToken } });
    setProgress(false);
  };

  return (
    isProgress ?
      <CustomProgressBar />
      :

      <View style={{ flex: 1, backgroundColor:'#ffffff', padding:20}}>
        <View style={{marginTop:40}}>
          <Text style={{ fontSize: 15, color: '#04091E', fontWeight:'700' }}>MT5 Hesap Numarası:</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Sample: 11105478"
              onChangeText={setAccountNumber}
            />
          </View>
        </View>
        <View style={{marginTop:20}}>
          <Text style={{ fontSize: 15, color: '#04091E', fontWeight:'700' }}>Miktar:</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Miktarı Girin..."
              onChangeText={setAmount}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => withdraw()} style={{ alignItems: "center", marginTop: 60 }}>
          <Text style={styles.widthdrawButton}>ÇEK</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    marginTop: 10,
    alignItems: "center"
  },
  inputText:{
    flex:1, 
    padding:15
  },
  widthdrawButton: {
    color: "#FFFFFF",
    backgroundColor: "#FF0057",
    borderRadius: 5,
    width: 200,
    height: 50,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

export default WithdrawScreen;