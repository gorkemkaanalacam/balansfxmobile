import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BulletinScreens from '../screens/BulletinScreens';
import BulletinDetailScreen from '../screens/BulletinDetailScreen';

const BulletinStack = createStackNavigator();
function BulletinStackScreen() {
  return (
    <BulletinStack.Navigator
    screenOptions={{headerTitleAlign: "center"}}>
      <BulletinStack.Screen name="Bulletin" options={{title:'Bülten'}} component={BulletinScreens} />
      <BulletinStack.Screen name="BulletinDetail" options={{title:'Bülten Detayı'}} component={BulletinDetailScreen} />
    </BulletinStack.Navigator>
  );
}

export default BulletinStackScreen;
