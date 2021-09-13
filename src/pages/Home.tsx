import React from 'react';
import {Text, View} from 'react-native';
import Transaction from '../components/Transaction';
import {useAppSelector} from '../redux/Hooks';
import {TransactionObject} from '../utilities/constants';
import {textStyle} from '../styles/Styles';

/**
 * Home page of the app
 */

const username = 'Sajan';

const Home: React.FC = () => {
  const transactions = useAppSelector(state => state.data);

  return (
    <View>
      <Text style={textStyle.subsection}>Hello</Text>
      <Text style={textStyle.header}>{username}</Text>

      {transactions !== undefined &&
        // @ts-ignore idk why it doesn't recognize transactions as an array
        transactions.map((transaction: TransactionObject, index: number) => (
          <Transaction key={index} transaction={transaction} />
        ))}
    </View>
  );
};

export default Home;
