import React from 'react';
import {View} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import Routes from './components/Routes';
import Store from './redux/Store';
import {global} from './styles/Styles';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {apolloServerUri} from './shared/utilities/constants';

const client = new ApolloClient({
  uri: apolloServerUri,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={Store}>
        <View style={global.background}>
          <Routes />
        </View>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default App;
