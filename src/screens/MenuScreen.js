import React from 'react';
import { Text, View, Button ,TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/authContext';
import { FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


const MenuScreen = ({ navigation }) => {
  const context = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'stretch', backgroundColor:'#ffffff' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Withdraw')}>
          <View style={{padding:20, flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#EEEEEE"}}>
              <FontAwesome5 name="hand-holding-usd" size={20} color="black" />
              <Text style={{flex:1, marginLeft:20}}>Çek</Text>
              <FontAwesome name="chevron-right" size={20} color="black"/>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Deposit')}>
          <View style={{padding:20, flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#EEEEEE"}}>
              <FontAwesome5 name="money-bill-alt" size={20} color="black" />
              <Text style={{flex:1, marginLeft:20}}>Yatır</Text>
              <FontAwesome name="chevron-right" size={20} color="black"/>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <View style={{padding:20, flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#EEEEEE"}}>
              <MaterialIcons name="headset-mic" size={20} color="black" />
              <Text style={{flex:1, marginLeft:20}}>İletişim</Text>
              <FontAwesome name="chevron-right" size={20} color="black"/>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={context.authContext.signOut}>
          <View style={{padding:20, flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#EEEEEE"}}>
              <FontAwesome5 name="sign-out-alt" size={20} color="black" />
              <Text style={{flex:1, marginLeft:20}}>Çıkış Yap</Text>
              <FontAwesome name="chevron-right" size={20} color="black"/>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;