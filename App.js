import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { Provider, AuthContext } from './src/context/authContext';
import TradingStackScreen from './src/navigator/TradingStackScreen';
import PortfolioStackScreen from './src/navigator/PortfolioStackScreen';
import NewsStackScreen from './src/navigator/NewsStackScreen';
import BulletinStackScreen from './src/navigator/BulletinStackScreen';
import SentimentsStackScreen from './src/navigator/SentimentsStackScreen';
import MenuStackScreen from './src/navigator/MenuStackScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ActivationScreen from './src/screens/ActivationScreen';
import ChangeForgottenPasswordScreen from './src/screens/ChangeForgottenPasswordScreen';
import MainAuthScreen from './src/screens/MainAuthScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AuthNavigator = createStackNavigator();
function AuthNavigatorScreen() {
  return (
    <AuthNavigator.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <AuthNavigator.Screen
        options={{ headerShown: false }}
        name="MainAuth"
        component={MainAuthScreen}
      />
      <AuthNavigator.Screen name="Login" component={LoginScreen} />
      <AuthNavigator.Screen name="Register" component={RegisterScreen} />
      <AuthNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthNavigator.Screen name="Activation" component={ActivationScreen} />
      <AuthNavigator.Screen
        name="ChangeForgottenPassword"
        component={ChangeForgottenPasswordScreen}
      />
    </AuthNavigator.Navigator>
  );
}

const TabNavigator = createBottomTabNavigator();
function TabNavigatorScreen() {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trading') {
            iconName = focused ? 'swap' : 'swap';
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'wallet' : 'wallet';
          } else if (route.name === 'News') {
            iconName = focused ? 'news' : 'news';
          } else if (route.name === 'Bulletin') {
            iconName = focused ? 'area-graph' : 'area-graph';
          } else if (route.name === 'Sentiments') {
            iconName = focused ? 'line-graph' : 'line-graph';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu';
          }

          // You can return any component that you like here!
          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#04091E',
        inactiveTintColor: '#C4CAD4',
      }}
    >
      <TabNavigator.Screen
        name="Trading"
        options={{ title: 'Sinyal' }}
        component={TradingStackScreen}
      />
      <TabNavigator.Screen
        name="Portfolio"
        options={{ title: 'Fiyatlar' }}
        component={PortfolioStackScreen}
      />
      <TabNavigator.Screen
        name="News"
        options={{ title: 'Haberler' }}
        component={NewsStackScreen}
      />
      <TabNavigator.Screen
        name="Bulletin"
        options={{ title: 'Bülten' }}
        component={BulletinStackScreen}
      />
      <TabNavigator.Screen
        name="Sentiments"
        options={{ title: 'Takvim' }}
        component={SentimentsStackScreen}
      />
      <TabNavigator.Screen
        name="Menu"
        options={{ title: 'Menü' }}
        component={MenuStackScreen}
      />
    </TabNavigator.Navigator>
  );
}

const AppMainNavigator = createStackNavigator();
const AppMainNavigatorScreen = () => {
  const context = React.useContext(AuthContext);
  const isAuth = context.state.userToken == null ? false : true;

  return (
    <AppMainNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuth ? (
        <AppMainNavigator.Screen
          name="TabNavigator"
          component={TabNavigatorScreen}
        />
      ) : (
        <AppMainNavigator.Screen
          name="AuthNavigator"
          component={AuthNavigatorScreen}
        />
      )}
    </AppMainNavigator.Navigator>
  );
};

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Provider>
      <NavigationContainer>
        <AppMainNavigatorScreen />
      </NavigationContainer>
    </Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await fetch(
      'https://api.balancefx.co.uk/PushNotification/Create?token=' + token,
      {
        method: 'POST',
      }
    );
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
