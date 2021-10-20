import React from 'react';
import {Text as NativeText} from 'react-native';
import {textStyle} from '../styles/Styles';

interface TextStyleProps {
  value: string;
  style?: object; // TODO: add type for style
}

export const Text: React.FC<TextStyleProps> = props => {
  return (
    <NativeText style={[textStyle.text, props.style]}>{props.value}</NativeText>
  );
};

export const Header: React.FC<TextStyleProps> = props => {
  return (
    <NativeText style={[textStyle.header, props.style]}>
      {props.value}
    </NativeText>
  );
};

export const Subsection: React.FC<TextStyleProps> = props => {
  return (
    <NativeText style={[textStyle.subsection, props.style]}>
      {props.value}
    </NativeText>
  );
};

export const NavText: React.FC<TextStyleProps> = props => {
  return (
    <NativeText style={[textStyle.navText, props.style]}>
      {props.value}
    </NativeText>
  );
};
