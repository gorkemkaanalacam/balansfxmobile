import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TradingScreen from '../screens/TradingScreen';
import TradingDetailScreen from '../screens/TradingDetailScreen';

const TradingStack = createStackNavigator();
function TradingStackScreen() {
  return (
    <TradingStack.Navigator
    screenOptions={{headerTitleAlign: "center"}}>
      <TradingStack.Screen name="Trading" options={{title:'Sinyal Listesi'}} component={TradingScreen} />
      <TradingStack.Screen name="TradingDetail" options={{title:'Sinyal Detayı'}} component={TradingDetailScreen} />
    </TradingStack.Navigator>
  );
}

export default TradingStackScreen;
