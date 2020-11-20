import React, { useState, useContext } from 'react';
import { Image, Text, View, TextInput, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/backButton';
import CustomProgressBar from '../components/customProgressBar'

const RegisterScreen = ({ navigation }) => {
  const [isProgress, setProgress] = React.useState(false);
  const context = useContext(AuthContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);

  const applicationRegister = async (data) => {
    const validateError = validator();
    if (!validateError) {
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setPhone("");
      setProgress(true);
      await context.authContext.signUp(data);
    }
    else {
      Alert.alert("Geçersizlik Hatası", validateError)
    }
    setProgress(false);
  }

  const validator = () => {
    if (!name) {
      return "Lütfen İsminizi Giriniz";
    }
    if (!surname) {
      return "Lütfen Soyisminizi Giriniz";
    }
    if (!email) {
      return "Lütfen Mail Adresinizi Giriniz";
    }
    if (!password) {
      return "Lütfen Şifrenizi Giriniz";
    }
    if (!phone) {
      return "Lütfen Telefon Numaranızı Giriniz";
    }
    if (!terms) {
      return "Kayıt olabilmeniz için kullanıcı sözleşmenizi onaylamanız gerekiyor";
    }
    return "";
  }

  return (
    isProgress ?
      <CustomProgressBar />
      :

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: '#ffffff', padding: 20 }}>
        <ScrollView>
          <BackButton navigation={navigation} />
          <Image source={require('../../assets/BalansFxLogo.png')} style={{ width: 200, height: 100, marginTop: 40, resizeMode: "contain", alignSelf: "center" }} />
          <Text style={{ fontSize: 15, color: "#04091E", textAlign: "center", fontWeight: "700", marginBottom: 50 }}>BalansFX'e Kayıt Ol</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ ...styles.inputView, flex: 1 }}>
              <FontAwesome name="user" size={16} color="#d7d8dd" />
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                placeholder="İsim"
                onChangeText={setName}
              />
            </View>
            <View style={{ ...styles.inputView, marginLeft: 15, flex: 1 }}>
              <FontAwesome name="user" size={16} color="#d7d8dd" />
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                placeholder="Soyisim"
                onChangeText={setSurname}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <FontAwesome name="envelope" size={16} color="#d7d8dd" />
            <TextInput
              style={{ flex: 1, marginLeft: 15 }}
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
          <View style={{ flexDirection: "row" }}>
            <View style={styles.inputView}>
              <Text style={{ fontSize: 15, color: '#C7C7CD' }}>+90</Text>
            </View>
            <View style={{ ...styles.inputView, marginLeft: 15, flex: 1 }}>
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                placeholder="Telefon"
                onChangeText={setPhone}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 35 }}>
            <Switch
              style={{ flexShrink: 0 }}
              value={terms}
              onValueChange={setTerms}
            // trackColor={{ false: "#767577", true: "#04091E" }}
            // thumbColor={terms ? "#04091E" : "#f4f3f4"}
            />
            <Text style={{ color: '#04091E', flex: 1 }}>
              Balansfx.com kullanıcı sözleşmesi ve gizililik politikasını ayrıca e-posta yoluyla güncellemeleri almayı kabul ediyorum.
        </Text>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Switch
              style={{ flexShrink: 0 }}
              value={terms}
              onValueChange={setTerms}
            />
            <Text style={{ color: '#04091E', flex: 1 }}>
              I hereby agree to be contacted by MetaTrader for promontional purposes
        </Text>
          </View> */}
          <TouchableOpacity onPress={() => applicationRegister({ name, surname, email, password, phone })} style={{ alignItems: "center", marginTop: 60 }}>
            <Text style={styles.loginButton}>KAYIT OL</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 40 }}>
            <Text style={{ fontSize: 15, color: "#04091E", textAlign: "center", fontWeight: "500" }}>Hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 15, color: "#04091E", textAlign: "center", fontWeight: "700", textDecorationLine: "underline" }}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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

export default RegisterScreen;