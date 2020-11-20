import React, { useState } from 'react';
import { FlatList, Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomProgressBar from '../components/customProgressBar'
import { AuthContext } from '../context/authContext';
import BackButton from '../components/backButton';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [isProgress, setProgress] = React.useState(false);
  const context = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const applicationLogin = async (data) => {
    const validateError = validator();
    if (!validateError) {
      setEmail("");
      setPassword("");
      setProgress(true);
      await context.authContext.signIn(data);
    }
    else{
      Alert.alert("Geçersiz giriş" , validateError)
    }
    setProgress(false);
  }

  const validator = () => {
    if (!email) {
        return "Lütfen bir email adresği giriniz";
    }
    if (!password) {
      return "Lütfen bir şifre giriniz";
    }
    return "";
  }

  return (
    isProgress ?
      <CustomProgressBar />
      :

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: '#ffffff', padding: 20 }}>
        <BackButton navigation={navigation} />
        <Image source={require('../../assets/BalansFxLogo.png')} style={{ width: 200, height: 100, marginTop: 40, resizeMode: "contain", alignSelf: "center" }} />
        <Text style={{ fontSize: 15, color: "#04091E", textAlign: "center", fontWeight: "700", marginBottom: 50 }}>BalansFX'e Giriş Yap</Text>
        <View style={styles.inputView}>
          <FontAwesome name="envelope" size={16} color="#d7d8dd" />
          <TextInput
            style={{ flex: 1, marginLeft: 10 }}
            placeholder="E-Posta"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputView}>
          <FontAwesome name="lock" size={16} color="#d7d8dd" />
          <TextInput
            style={{ flex: 1, marginLeft: 10 }}
            secureTextEntry={true}
            placeholder="Şifre"
            onChangeText={setPassword}
          />
        </View>
        {/* <View>
          <FlatList
            data={errorMessage}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{flexDirection:"row", marginTop:10}}>
                  <Image source={require('../../assets/remove.png')} style={{ marginRight:10, width: 20, height: 20, resizeMode: "contain", flexShrink:0}} />
                  <Text style={{flex:1}}>
                    {item.message}
                  </Text>
                </View>
              );
            }} />
        </View> */}
        <TouchableOpacity onPress={() => applicationLogin({ email, password })} style={{ alignItems: "center", marginTop: 60 }}>
          <Text style={styles.loginButton}>Giriş</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignItems: "center", marginTop: 25 }}>
          <Text style={{ fontSize: 15, color: '#04091E', fontWeight: '700', textDecorationLine: 'underline' }}>Şifremi Unuttum</Text>
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
  loginButton: {
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

export default LoginScreen;