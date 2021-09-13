import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Navigator} from './RoutesContext';

export const Previous: React.FC = () => {
  const {goBack} = useContext(Navigator);

  return (
    <TouchableOpacity style={styles.previousButton} onPress={() => goBack()}>
      <Text style={styles.previousButton}>Previous</Text>
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
