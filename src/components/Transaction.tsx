import React from 'react';
import {Text, View} from 'react-native';
import {TransactionObject} from '../utilities/constants';

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
      <Text> Name: {props.transaction.Name} </Text>
      <Text> Subtitle: {props.transaction.Subtitle} </Text>
      <Text> Price: {props.transaction.Price} </Text>
    </View>
  );
};

export default Transaction;
