import React from 'react';
import accountApi from '../api/account';
import { Alert, AsyncStorage } from 'react-native';
import CustomProgressBar from '../components/customProgressBar'

const AuthContext = React.createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const response = await accountApi.post('/Login?email=' + data.email + '&password=' + data.password);
        if(response.status == 200 && !response.data.hasError){
          await AsyncStorage.setItem('token', response.data.data);
          dispatch({ type: 'SIGN_IN', token: response.data.data });
        }
        else{
          Alert.alert("Error");
        }
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        const response = await accountApi.post('/Register', data);
        if (response.status == 200 && !response.data.hasError) {
          await AsyncStorage.setItem('token', response.data.data);
          dispatch({ type: 'SIGN_IN', token: response.data.data });
        }
        else{
          Alert.alert("Error");
        }
      },
    }),
    []
  );

  return (
      state.isLoading ?
      (
        <CustomProgressBar />
      )
      :
      (
        <AuthContext.Provider value={{ authContext, state}}>
          {children}
        </AuthContext.Provider>
      )
  );
};

export { Provider, AuthContext };
