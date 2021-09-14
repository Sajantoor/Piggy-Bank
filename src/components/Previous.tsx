import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Navigator} from './RoutesContext';
import Subsection from './styled/Subsection';

export const Previous: React.FC = () => {
  const {goBack} = useContext(Navigator);

  return (
    <TouchableOpacity style={styles.previousButton} onPress={() => goBack()}>
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
