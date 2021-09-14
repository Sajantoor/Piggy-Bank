import React from 'react';
import {Text as NativeText} from 'react-native';
import {textStyle} from '../../styles/Styles';

interface NavTextProps {
  value: string;
}

const NavText: React.FC<NavTextProps> = props => {
  return <NativeText style={textStyle.navText}>{props.value}</NativeText>;
};

export default NavText;
