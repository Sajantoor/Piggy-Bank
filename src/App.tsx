import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Add from './pages/Add';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import Transactions from './pages/Transactions';
import {PageParamList} from './utilities/constants';

const Tab = createBottomTabNavigator<PageParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Statistics" component={Statistics} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
