import React from 'react';
import {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../styles/Constants';
import {textStyle} from '../styles/Styles';
import {PageNames} from '../utilities/constants';
import {Navigator} from './RoutesContext';

interface TabProps {
  title: PageNames;
  // and icons
  // add is active probably
}

/**
 * Navigation bottom tabs
 * @props `title`: The name of the page
 */
export const Tab: React.FC<TabProps> = props => {
  const {updateTab, updatePage} = useContext(Navigator);
  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={
        props.title === 'Add'
          ? () => updatePage(props.title)
          : () => updateTab(props.title)
      }>
      <Text style={textStyle.navText}> {props.title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    width: '20%',
    backgroundColor: colors.secondary,
  },
});
