import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import Routes from './components/Routes';
import Store from './redux/Store';
import {global} from './styles/Styles';

const App = () => {
  return (
    <Provider store={Store}>
      <View style={global.background}>
        <Routes />
      </View>
    </Provider>
  );
};

export default App;
