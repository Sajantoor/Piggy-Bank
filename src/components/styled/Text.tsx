import React from 'react';
import {Text as NativeText} from 'react-native';
import {textStyle} from '../../styles/Styles';

interface TextProps {
  value: string;
}

const Text: React.FC<TextProps> = props => {
  return <NativeText style={textStyle.text}>{props.value}</NativeText>;
};

export default Text;
