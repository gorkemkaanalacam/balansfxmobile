import React from 'react';
import {View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const backButton = ({navigation}) => {
return(
<TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:30, alignItems:"flex-start"}}>
          <View style={{backgroundColor:'#F2F2F2', width:50, height:50, borderRadius:200, alignItems:"center", justifyContent:"center"}}>
              <FontAwesome name="chevron-left" size={20} color="black" />
          </View>
</TouchableOpacity>
);
}

export default backButton