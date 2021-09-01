import React from 'react';
import {View} from 'react-native';
import Add from '../pages/Add';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Statistics from '../pages/Statistics';
import Transactions from '../pages/Transactions';
import {NavigatorProps, PageNames} from '../utilities/constants';
import {Tab} from './Tab';

interface State {
  page: React.FC<NavigatorProps>;
}

// String to component mapping
const pagesMap = {
  Home: Home,
  Add: Add,
  Profile: Profile,
  Statistics: Statistics,
  Transactions: Transactions,
};

export default function Routes() {
  const [state, setState] = React.useState<State>({
    page: Home,
  });

  const updatePageStr = (page: PageNames) => {
    setState({page: pagesMap[page]});
  };

  const updatePage = (page: React.FC) => {
    setState({page: page});
  };

  return (
    <View>
      <state.page navigator={updatePageStr} />
      <Tab title="Home" onPress={updatePage} component={Home} />
      <Tab title="Statistics" onPress={updatePage} component={Statistics} />
      <Tab title="Add" onPress={updatePage} component={Add} />
      <Tab title="Transactions" onPress={updatePage} component={Transactions} />
      <Tab title="Profile" onPress={updatePage} component={Profile} />
    </View>
  );
}
