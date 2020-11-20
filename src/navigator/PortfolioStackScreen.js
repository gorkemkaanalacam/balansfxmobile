import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PortfolioScreen from '../screens/PortfolioScreen';
import ExchangeList from '../screens/ExchangeList';

const PortfolioStack = createStackNavigator();
function PortfolioStackScreen() {
  return (
    <PortfolioStack.Navigator
    screenOptions={{headerTitleAlign:"center"}}>
    <PortfolioStack.Screen name="Exchange" options={{title:'Canlı Fiyatlar'}} component={ExchangeList} />
      <PortfolioStack.Screen name="Portfolio" component={PortfolioScreen} />
    </PortfolioStack.Navigator>
  );
}

export default PortfolioStackScreen;
