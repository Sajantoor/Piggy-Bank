import React from 'react';
import { useContext } from 'react';
import {Button} from 'react-native';
import { PageNames} from '../utilities/constants';
import { RoutesContext } from './RoutesContext';

interface TabProps {
  title: PageNames;
  // is active probably
}

export const Tab: React.FC<TabProps> = props => {
  const { updatePage } = useContext(RoutesContext);
  return <Button title={props.title} onPress={() => updatePage(props.title)} />;
};
