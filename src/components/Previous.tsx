import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Navigator} from './RoutesContext';
import {Subsection} from './StyledText';

interface PreviousProps {
  backFunc?: () => void;
}

export const Previous: React.FC<PreviousProps> = (props) => {
  const {goBack} = useContext(Navigator);
  const backFunc = props.backFunc;
  // if backfunc is defined use it, otherwise use goBack -> this function will always be defined
  const handlePress = backFunc ? backFunc : goBack;

  return (
    <TouchableOpacity style={styles.previousButton} onPress={() => handlePress()}>
      <Subsection value="Previous" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  previousButton: {
    flex: 1,
    justifyContent: 'center',
    color: '#FFF',
  },
});
