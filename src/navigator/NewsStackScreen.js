import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreens from '../screens/NewsScreens';
import NewsDetailScreen from '../screens/NewsDetailScreen';

const NewsStack = createStackNavigator();
function NewsStackScreen() {
  return (
    <NewsStack.Navigator
    screenOptions={{headerTitleAlign: "center"}}>
      <NewsStack.Screen name="News" options={{title:'Haberler'}} component={NewsScreens} />
      <NewsStack.Screen name="NewsDetail" options={{title:'Haber Detayı'}} component={NewsDetailScreen} />
    </NewsStack.Navigator>
  );
}

export default NewsStackScreen;
