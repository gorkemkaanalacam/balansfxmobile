import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View, TextInput, Alert  } from 'react-native';
import CustomProgressBar from '../components/customProgressBar';
import accountApi from '../api/account';
import BackButton from '../components/backButton';
import { FontAwesome } from '@expo/vector-icons'; 

const ChangeForgottenPasswordScreen = ({route, navigation}) => {
  const [isProgress, setProgress] = useState(false);
  const [password, setPassword] = useState("");

  const changeForgottenPassword = async (password) => {
    setProgress(true);
    var response =  await accountApi.post('/ChangeForgottenPassword?code=' + route.params + '&newPassword=' +  password);
    setProgress(false);
    if(response.status == 200 && !response.data.hasError){
      Alert.alert(
        "Başarılı",
        "Şifreniz Değiştirildi",
        [
          { text: "OK", onPress: () => navigation.popToTop() }
        ]
      );
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
        <Image source={require('../../assets/changepass.png')} style={{ width: 200, height: 100, marginTop: 40, resizeMode: "contain", alignSelf: "center" }} />
        <Text style={{ fontSize: 18, color: "#04091E", textAlign: "center", fontWeight: "700", marginBottom: 15, marginTop:60 }}>Yeni Şifre Oluştur</Text>
        <Text style={{ fontSize: 12, color: "#C4CAD4", textAlign: "center", marginBottom: 30 }}>Yeni kullanmak istediğiniz şifrenizi giriniz</Text>
        <View style={styles.inputView}>
          <FontAwesome name="lock" size={16} color="#d7d8dd" />
          <TextInput
            style={{ flex: 1, marginLeft: 15 }}
            placeholder="Şifre"
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={() => changeForgottenPassword(password)} style={{ alignItems: "center", marginTop: 35 }}>
          <Text style={styles.changeButton}>DEĞİŞTİR</Text>
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
  changeButton: {
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

export default ChangeForgottenPasswordScreen;