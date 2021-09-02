import React from 'react';
import Add from '../pages/Add';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Statistics from '../pages/Statistics';
import Transactions from '../pages/Transactions';
import {PageNames} from '../utilities/constants';
import { Navigator } from './RoutesContext';
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

const navigationStack: React.FC[] = [Home];

const Routes: React.FC = () => {
  const [state, setState] = React.useState<State>({
    page: Home,
  });

  // create a stack data structure of pages
  const updatePage = (page: PageNames) => {
    // push to navigator stack
    navigationStack.push(pagesMap[page]);
    setState({page: pagesMap[page]});
  };

  const goBack = () => {
    // get last page from stack (pop twice)
    navigationStack.pop();
    const lastPage = navigationStack.pop();
    // go to last page
    if (lastPage) {
      setState({page: lastPage});
    }
  };

  const updateTab = (page: PageNames) => {
    // clear stack
    navigationStack.length = 0;
    // push to navigator stack and switch page
    navigationStack.push(pagesMap[page]);
    console.log('update tab');
    console.log(navigationStack);
    setState({page: pagesMap[page]});

  };
  
  const page = state.page;

  return (
    <Navigator.Provider value={{page, updatePage, updateTab, goBack}}>
      <state.page/>
      <Tab title="Home"/>
      <Tab title="Statistics"/>
      <Tab title="Add"/>
      <Tab title="Transactions"/>
      <Tab title="Profile"/>
    </Navigator.Provider>
  );
}

export default Routes;