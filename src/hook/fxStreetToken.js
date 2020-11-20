import { AsyncStorage } from 'react-native';
import accountApi from '../api/account';

const setFxStreetToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const response = await accountApi.post('/FxStreetToken', null, { headers: { Authorization: "Bearer " + userToken } })
    if (response.status == 200 && !response.data.hasError) {
        let date = new Date();
        date.setHours(date.getHours() + 6);
        let fxstreetToken = { token: response.data.data, expireDate: date }
        await AsyncStorage.setItem('fxstreetToken', JSON.stringify(fxstreetToken));
    }
}

const checkFxStreetToken = async () => {
    let fxstreetTokenString = await AsyncStorage.getItem('fxstreetToken');
    let fxstreetToken;

    if(fxstreetTokenString){
        fxstreetToken = JSON.parse(fxstreetTokenString);
        if (new Date(fxstreetToken.expireDate) < new Date()) {
            await setFxStreetToken();
        }
    }
    else{
        await setFxStreetToken();
    }
}

const FxStreetToken = async () => {
    await checkFxStreetToken();
    
    const fxstreetTokenString = await AsyncStorage.getItem('fxstreetToken');
    const fxstreetToken = JSON.parse(fxstreetTokenString);

    return fxstreetToken;
};

export default FxStreetToken;