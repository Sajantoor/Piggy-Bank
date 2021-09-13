import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontColors, fonts} from './Constants';

export const textStyle = StyleSheet.create({
  header: {
    fontSize: 34,
    fontFamily: fonts,
    fontWeight: 'bold',
    color: fontColors.primary,
    padding: 2,
  },

  subsection: {
    fontSize: 18,
    fontFamily: fonts,
    color: fontColors.secondary,
    padding: 1,
  },

  text: {
    fontSize: 16,
    fontFamily: fonts,
    color: fontColors.primary,
    padding: 1,
  },

  navText: {
    fontSize: 14,
    fontFamily: fonts,
    color: fontColors.primary,
    padding: 5,
    paddingBottom: 10,
    paddingTop: 5,
    textAlign: 'center',
  },
});

export const global = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
