import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TransactionObject} from '../utilities/constants';
import Transaction from '../components/Transaction';

const Home: React.FC = () => {
  const [transactions] = useState<TransactionObject[]>([]);

  return (
    <View>
      <Text>Home</Text>
      {transactions.map((transaction, index) => (
        <Transaction key={index} transaction={transaction} />
      ))}
    </View>
  );
};

export default Home;
