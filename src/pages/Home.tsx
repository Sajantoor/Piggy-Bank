import React from 'react';
import {Text, Button, View} from 'react-native';
import { TransactionObject } from '../utilities/constants';
import Transaction from '../components/Transaction';

interface HomeState { 
    transactions: TransactionObject[],
}

class Home extends React.Component<any, HomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            transactions: new Array<TransactionObject>(),
        }
    }

    render() {
        const propTransaction = this.props?.route?.params?.newTransaction;
        if (propTransaction) {
            let transactions = this.state.transactions;
            transactions.push(propTransaction);
        }

        return (
            <View>
                <Text>Home</Text>

                {this.state.transactions.map((transaction, index) => {
                    return (
                        <Transaction key={index} transaction={transaction} />
                    )
                })} 
            </View>
        );
    }
}

export default Home;
