import React from 'react';
import { Text, View } from 'react-native';
// import { TransactionObject } from '../utilities/constants';

// interface TransactionProps {
//     transaction: TransactionObject;
// }

export const Transaction: React.FC<any> = (props) => {
        return (
            <View>
                <Text> Name: {props.transaction.Name } </Text>
                <Text> Subtitle: {props.transaction.Subtitle} </Text> 
                <Text> Price: {props.transaction.Price} </Text>
            </View>
        );
}

export default Transaction;
