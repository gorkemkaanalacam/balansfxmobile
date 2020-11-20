import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';

const SentimentsStack = createStackNavigator();
function SentimentsStackScreen() {
  return (
    <SentimentsStack.Navigator>
      <SentimentsStack.Screen options={{ headerLeft: false, headerTitleAlign: "center", title:'Takvim'}} name="Calendar" component={CalendarScreen} />
      {/* <SentimentsStack.Screen name="Details" component={DetailsScreen} /> */}
    </SentimentsStack.Navigator>
  );
}

export default SentimentsStackScreen;
