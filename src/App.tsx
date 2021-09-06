import React from 'react';
import {Provider} from 'react-redux';
import Routes from './components/Routes';
import Store from './redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
};

export default App;
