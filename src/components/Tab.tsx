import React from 'react';
import {Button} from 'react-native';
import { PageNames} from '../utilities/constants';

interface TabProps {
  title: PageNames;
  onPress: (page: React.FC) => void;
  component: React.FC; 
}

export const Tab: React.FC<TabProps> = props => {
  return <Button title={props.title} onPress={() => props.onPress(props.component)} />;
};
