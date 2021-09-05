import React from 'react';
import {StyleSheet, View} from 'react-native';
import Add from '../pages/Add';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Statistics from '../pages/Statistics';
import Transactions from '../pages/Transactions';
import {PageNames} from '../utilities/constants';
import {Navigator} from './RoutesContext';
import {Tab} from './Tab';

interface State {
  page: React.FC;
}

/**
 * Maps the page name to the page component.
 */
const pagesMap = {
  Home: Home,
  Add: Add,
  Profile: Profile,
  Statistics: Statistics,
  Transactions: Transactions,
};

const navigationStack: React.FC[] = [Home];

/**
 * Clears an array.
 * @param array
 */
const arrayClear = (array: any[]) => {
  while (array.length) {
    array.pop();
  }
};

/**
 * Routes component contains a list of tabs and the corresponding pages.
 * It has a navigator using useContext that is used to navigate between pages.
 */
const Routes: React.FC = () => {
  const [state, setState] = React.useState<State>({
    page: Home,
  });

  /**
   * Navigates to the page and pushes to the stack.
   * @param page The page we want to navigate to.
   */
  const updatePage = (page: PageNames) => {
    navigationStack.push(pagesMap[page]);
    setState({page: pagesMap[page]});
  };

  /**
   * Navigates to the previous page in the stack.
   */
  const goBack = () => {
    // get last page from stack (pop twice)
    navigationStack.pop();
    // pop to read the value of the last page
    const lastPage = navigationStack.pop();
    // push it back into the stack if it exists
    if (lastPage) {
      navigationStack.push(lastPage);
    }
    // go to last page
    if (lastPage) {
      setState({page: lastPage});
    }
  };

  /**
   * Navigates to the tab and clears the stack.
   * @param page The page we want to navigate to.
   */
  const updateTab = (page: PageNames) => {
    arrayClear(navigationStack);
    navigationStack.push(pagesMap[page]);
    setState({page: pagesMap[page]});
  };

  const page = state.page;

  return (
    <Navigator.Provider value={{page, updatePage, updateTab, goBack}}>
      <state.page />
      <View style={styles.container}>
        <Tab title="Home" />
        <Tab title="Statistics" />
        <Tab title="Add" />
        <Tab title="Transactions" />
        <Tab title="Profile" />
      </View>
    </Navigator.Provider>
  );
};

// styles
const styles = StyleSheet.create({
  // position container on the bottom
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default Routes;
