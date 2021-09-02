import React from 'react';
import {useContext} from 'react';
import {Button} from 'react-native';
import {PageNames} from '../utilities/constants';
import {Navigator} from './RoutesContext';

interface TabProps {
  title: PageNames;
  // is active probably
}

export const Tab: React.FC<TabProps> = props => {
  const {updateTab, updatePage} = useContext(Navigator);
  return (
    <Button
      title={props.title}
      onPress={
        props.title === 'Add'
          ? () => updatePage(props.title)
          : () => updateTab(props.title)
      }
    />
  );
};
