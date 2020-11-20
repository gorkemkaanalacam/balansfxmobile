import React from 'react';
import { Modal, Text, View, ActivityIndicator} from 'react-native';

const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible}>
      <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: '200' }}>İşleniyor...</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );

  export default CustomProgressBar;