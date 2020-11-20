import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import CustomProgressBar from '../components/customProgressBar'
import accountApi from '../api/account';
import BackButton from '../components/backButton';
import { FontAwesome } from '@expo/vector-icons'; 

const ActivationScreen = ({ navigation }) => {
  const [isProgress, setProgress] = useState(false);
  const [code, setCode] = useState("");

  const activate = async (code) => {
    setProgress(true);
    var response =  await accountApi.post("/Activate?code=" + code);
    setProgress(false);
    if(response.status == 200 && !response.data.hasError){
        navigation.navigate('ChangeForgottenPassword', code);
    }
    else{
        Alert.alert("Error");
    }
  };

  return (
    isProgress ?
    <CustomProgressBar/>
    :

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor:'#ffffff', padding:20}}>
        <BackButton navigation={navigation}/>
        <Image source={require('../../assets/checkmail.png')} style={{ width: 200, height: 100, marginTop: 40, resizeMode: "contain", alignSelf: "center" }} />
        <Text style={{ fontSize: 18, color: "#04091E", textAlign: "center", fontWeight: "700", marginBottom: 15, marginTop:60 }}>Mail kutunuzu kontrol edin</Text>
        <Text style={{ fontSize: 12, color: "#C4CAD4", textAlign: "center", marginBottom: 30 }}>Şifre güncelleme talimatlarını mail adresinize gönderdik</Text>
        <View style={styles.inputView}>
          <FontAwesome name="lock" size={16} color="#d7d8dd" />
          <TextInput
            style={{ flex: 1, marginLeft: 15 }}
            placeholder="Kod"
            onChangeText={setCode}
          />
        </View>
        <TouchableOpacity onPress={() => activate(code)} style={{ alignItems: "center", marginTop: 35 }}>
          <Text style={styles.sendButton}>AKTİF ET</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    padding: 15,
    marginTop: 10,
    alignItems: "center"
  },
  sendButton: {
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

export default ActivationScreen;