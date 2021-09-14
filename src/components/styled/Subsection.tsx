import React from 'react';
import {Text as NativeText} from 'react-native';
import {textStyle} from '../../styles/Styles';

interface SubsectionProps {
  value: string;
}

const Subsection: React.FC<SubsectionProps> = props => {
  return <NativeText style={textStyle.subsection}>{props.value}</NativeText>;
};

export default Subsection;
