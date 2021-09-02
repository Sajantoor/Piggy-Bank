import React from 'react';
import Add from '../pages/Add';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Statistics from '../pages/Statistics';
import Transactions from '../pages/Transactions';
import {PageNames} from '../utilities/constants';
import { RoutesContext } from './RoutesContext';
import {Tab} from './Tab';

interface State {
  page: React.FC;
}

// String to component mapping
const pagesMap = {
  Home: Home,
  Add: Add,
  Profile: Profile,
  Statistics: Statistics,
  Transactions: Transactions,
};

const Routes: React.FC = () => {
  const [state, setState] = React.useState<State>({
    page: Home,
  });

  const updatePage = (page: PageNames) => {
    setState({page: pagesMap[page]});
  };
  
  const page = state.page;

  return (
    <RoutesContext.Provider value={{page, updatePage}}>
      <state.page/>
      <Tab title="Home"/>
      <Tab title="Statistics"/>
      <Tab title="Add"/>
      <Tab title="Transactions"/>
      <Tab title="Profile"/>
    </RoutesContext.Provider>
  );
}

export default Routes;