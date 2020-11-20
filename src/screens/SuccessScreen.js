import React from 'react';
import { Button, Text, View} from 'react-native';

const SuccessScreen = (props) => {

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Başarılı</Text>
        <Text>{message}</Text>
        <Button
          title="tamam"
          onPress={() => props.navigaton.navigate('Login')}
        />
      </View>
  );
};

export default SuccessScreen;