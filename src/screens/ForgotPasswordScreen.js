import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View, TextInput, Alert } from 'react-native';
import CustomProgressBar from '../components/customProgressBar'
import accountApi from '../api/account';
import BackButton from '../components/backButton';
import { FontAwesome } from '@expo/vector-icons'; 

const ForgotPasswordScreen = ({ navigation }) => {
  const [isProgress, setProgress] = useState(false);
  const [email, setEmail] = useState("");

  const sendActivationCode = async (email) => {
    setProgress(true);
    var response =  await accountApi.post("SendActivationCode?email=" + email);
    setProgress(false);
    if(response.status == 200 && !response.data.hasError){
        navigation.navigate('Activation');
    }
    else if(response.data.hasError && response.data.statusCode == 105){
      Alert.alert("Geçersiz Mail", "Bu mail adresine sahip bir kullanıcı bulumamaktadır.");
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
        <Image source={require('../../assets/forgotpass.png')} style={{ width: 200, height: 100, marginTop: 40, resizeMode: "contain", alignSelf: "center" }} />
        <Text style={{ fontSize: 18, color: "#04091E", textAlign: "center", fontWeight: "700", marginBottom: 15, marginTop:60 }}>Şifremi Unuttum</Text>
        <Text style={{ fontSize: 12, color: "#C4CAD4", textAlign: "center", marginBottom: 30 }}>Şifre güncelleme için e-mail adresinizi girin</Text>
        <View style={styles.inputView}>
          <FontAwesome name="envelope" size={16} color="#d7d8dd" />
          <TextInput
            style={{ flex: 1, marginLeft: 15 }}
            placeholder="E-Posta"
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity onPress={() => sendActivationCode(email)} style={{ alignItems: "center", marginTop: 35 }}>
          <Text style={styles.sendButton}>GÖNDER</Text>
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

export default ForgotPasswordScreen;