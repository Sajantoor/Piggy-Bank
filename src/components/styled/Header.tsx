import React from 'react';
import {Text as NativeText} from 'react-native';
import {textStyle} from '../../styles/Styles';

interface HeaderProps {
  value: string;
}

const Header: React.FC<HeaderProps> = props => {
  return <NativeText style={textStyle.header}>{props.value}</NativeText>;
};

export default Header;
