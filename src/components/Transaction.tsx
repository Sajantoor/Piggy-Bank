import React from 'react';
import {View} from 'react-native';
import {TransactionObject} from '../utilities/constants';
import {Text} from './StyledText';

interface TransactionProps {
  transaction: TransactionObject;
}

/**
 *
 * @param props **Name** of the transaction
 * @param props **Amount** of the transaction
 * @param props **Price** of the transaction
 */
export const Transaction: React.FC<TransactionProps> = props => {
  return (
    <View>
      <Text value={'Name: ' + props.transaction.Name} />
      <Text value={'Subtitle: ' + props.transaction.Subtitle} />
      <Text value={'Price: ' + props.transaction.Price} />
    </View>
  );
};

export default Transaction;
