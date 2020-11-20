import React from 'react';
import { Button, View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';

const image = require('../../assets/loginback.png');

const MainAuthScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={{backgroundColor:"#00000080", flex:1, padding:30}}>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 90, flex: 1 }}>
            <Text style={styles.balansfx}>BalansFX'e </Text>
            <Text style={styles.welcome}>Hoşgeldiniz</Text>
          </View>
          <Text style={{ fontSize: 22, color: "#ffffff", textAlign: "center" }}>Anlık Al/Sat Sinyallerine ve Piyasa analizlerine abone olun</Text>
          <Text style={{ fontSize: 16, color: "#ffffff", textAlign: "center", marginTop: 20 }}>Foreks, Kripto, Hisseler ve Endeksler</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ alignItems: "center", marginTop: 36 }}>
            <Text style={styles.joinbutton}>Ücretsiz Üye Ol</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 40 }}>
            <Text style={{ fontSize: 15, color: "#ffffff", textAlign: "center", fontWeight: "500" }}>Hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 15, color: "#ffffff", textAlign: "center", fontWeight: "700", textDecorationLine:"underline" }}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  },
  welcome: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "500"
  },
  balansfx: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700"
  },
  joinbutton: {
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: 200,
    height: 50,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

export default MainAuthScreen;