import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen';
import ContactScreen from '../screens/ContactScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import DepositScreen from '../screens/DepositScreen';

const MenuStack = createStackNavigator();
function MenuStackScreen() {
  return (
    <MenuStack.Navigator 
    screenOptions={{headerTitleAlign: 'center'}}
    >
      <MenuStack.Screen options={{ headerLeft: false}} name="Menu" component={MenuScreen} />
      <MenuStack.Screen name="Contact" options={{title:'İletişim'}} component={ContactScreen} />
      <MenuStack.Screen name="Withdraw" options={{title:'Çek'}} component={WithdrawScreen} />
      <MenuStack.Screen name="Deposit" options={{title:'Yatır'}} component={DepositScreen} />
    </MenuStack.Navigator>
  );
}

export default MenuStackScreen;
