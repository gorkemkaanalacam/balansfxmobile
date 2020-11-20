import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, AsyncStorage } from 'react-native';
import CustomProgressBar from '../components/customProgressBar'
import { AuthContext } from '../context/authContext';
import homeApi from '../api/home';
import accountApi from '../api/account';

const ContactScreen = ({ navigation }) => {
    const context = React.useContext(AuthContext);
    const [isProgress, setProgress] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
      setProgress(true);
      const userToken = await AsyncStorage.getItem('token');
        if(!userToken)
        {
            context.authContext.signOut();
        }

        const response = await homeApi.post("/ContactUs?message=" + message, null, {headers:{Authorization : "Bearer " + userToken}});
        setProgress(false);
    };

    useEffect(() => {
      const getProfile = async () => {
        setProgress(true);
        const token = await AsyncStorage.getItem("token");
        const response = await accountApi.get('/Profile', { headers: { Authorization: "Bearer " + token } });
        setFullName(response.data.data.name + " " + response.data.data.surname);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setProgress(false);
      };
      getProfile();
    }, []);

  return (
    isProgress ? 
    <CustomProgressBar/>
    :

    <View style={{ flex: 1, backgroundColor:'#ffffff', padding:20}}>
        <View style={{...styles.inputView, marginTop:40}}>
            <TextInput
              style={styles.inputText}
              editable = {false}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              editable = {false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              editable = {false}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Düşüncelerin Nelerdir ?"
              multiline={true}
              numberOfLines = {5}
              style={{...styles.inputText, textAlignVertical:"top"}}
              onChangeText={setMessage}
            />
          </View>
        <TouchableOpacity onPress={() => sendMessage()} style={{ alignItems: "center", marginTop: 60 }}>
          <Text style={styles.widthdrawButton}>GÖNDER</Text>
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

export default ContactScreen;